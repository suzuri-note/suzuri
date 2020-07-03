<template>
    <div class="editor-root">
        <div id="editor-interface" :class="editorInterfaceClass">
            <div class="editor-interface-left">
                <button type="button" v-bind:class="previewButtonClass" @click="onClickedPreview">
                    <i class="fab fa-markdown editor-markdown"></i>
                </button>
            </div>
            <div class="editor-interface-right">
                <button type="button" class="icon-btn" @click.stop="onClickedDone" v-bind:disabled="editing">
                   <i v-bind:class="doneButtonIconClass"></i>  
                </button>
            </div>
        </div>
        <div id="editor-body" :class="editorBodyClass">
            <div v-show="preview" class="editor-preview" v-html="htmlBody"></div>
            <textarea v-show="!preview" id="editor-textarea" v-model="bodyModel" class="editor-textarea" @input="onInput" @change="onChange"></textarea>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';

import noteService, { ISingleResponse } from '@/services/note';
import noteStore from '@/store/modules/note';
import appStore, { StatusLevel } from '@/store/mod  ules/app';
import datelib from '@/lib/datelib';
import localstorage from '@/lib/localstorage';

import MarkdownIt from 'markdown-it';
const md = new MarkdownIt();

@Component({})
export default class Editor extends Vue {
    @Prop()
    public id!: string | null;
    @Prop()
    public body!: string;
    @Prop()
    public preview!: boolean;
    @Prop()
    public navbarHidden!: boolean;

    public lastSavedBody!: string;
    public timeout!: number | null;
    public editing!: boolean;
    public initialTextareaHeight!: number | null;

    constructor() {
        super();
        this.timeout = null;
        this.editing = false;
        this.initialTextareaHeight = null;
    }

    public mounted() {
        const textarea: HTMLElement | null = document.getElementById('editor-textarea');
        if (textarea != null) {
            this.initialTextareaHeight = textarea.clientHeight;
        }
        this.adjustBodyHeight();
    }

    get bodyModel(): string {
        return this.body;
    }

    set bodyModel(newValue: string) {
        this.changedBody(newValue);
    }

    get htmlBody(): string {
        return md.render(this.body);
    }

    get previewButtonClass(): object {
        return {
            'icon-btn': true,
            'editor-interface-preview': true,
            'icon-btn-muted': !this.preview,
            'icon-btn-primary': this.preview,
        };
    }

    get doneButtonIconClass(): object {
        return {
            'fas': true,
            'icon-large': true,
            'icon-btn-muted': true,
            'editor-interface-done': true,

            'fa-circle-notch': this.editing,
            'icon-rotate': this.editing,

            'fa-check-circle': !this.editing,
        };
    }

    get editorBodyClass(): object {
        return {
            'editor-body': true,
        };
    }

    get editorInterfaceClass(): object {
        return {
            'editor-interface': true,
            'editor-interface-on-navbar-hidden': this.navbarHidden,
        };
    }

    public onClickedPreview(): void {
        this.clickedPreview();
    }

    public onInput(): void {
        this.adjustBodyHeight(); // 本文textareaの高さ調節
        this.autosave(); // localstorageへの保存
    }

    public onChange(): void {
        this.adjustBodyHeight(); // 本文textareaの高さ調節
        this.autosave(); // localstorageへの保存
    }

    public onClickedDone(): void {
        this.clickedDone();
    }

    @Watch('preview')
    public onChangedPreview(val: boolean, oldVal: boolean): void {
        if (val === false) {
            this.$nextTick(function() {
                this.adjustBodyHeight(); // 本文textareaの高さ調節
            });
        }
    }

    private autosave(): void {
        if (this.body !== this.lastSavedBody) {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            this.editing = true;
            const self = this;
            this.timeout = setTimeout(() => {
                self.autosaveEmitted();
                self.lastSavedBody = self.body;
                self.editing = false;
            }, 2000);
        }
    }

    private adjustBodyHeight(): void {
        const bodyTextarea: HTMLElement | null = document.getElementById('editor-textarea');
        if (bodyTextarea != null && this.initialTextareaHeight != null) {
            // Change #editor's height to 'auto' when bodyTextarea.scrollHeight is taller than it
            const editor: HTMLElement | null = document.getElementById('edit');
            if (editor != null) {
                if (bodyTextarea.scrollHeight > this.initialTextareaHeight) {
                    editor.style.height = 'auto';
                } else {
                    editor.style.height = '100vh';
                }
            }

            // Save the scrollLeft, scrollTop values
            // ref. https://stackoverflow.com/questions/18262729/how-to-stop-window-jumping-when-typing-in-autoresizing-textarea/18262927#18262927
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

            bodyTextarea.style.height = 'auto';
            if (bodyTextarea.scrollHeight > this.initialTextareaHeight) {
                bodyTextarea.style.height = bodyTextarea.scrollHeight + 'px';
            } else {
                bodyTextarea.style.height = this.initialTextareaHeight + 'px';
            }

            const scrollLeftAfter = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
            const scrollTopAfter = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

            // Restore the scrollLeft, scrollTop values after resizing the textarea
            window.scrollTo(scrollLeft, scrollTop);
        }
    }

    @Emit()
    private clickedPreview(): void {
        return;
    }

    @Emit()
    private clickedDone(): void {
        return;
    }

    @Emit()
    private autosaveEmitted(): void {
        return;
    }

    @Emit()
    private changedBody(newValue: string): void {
        return;
    }
}
</script>


<style lang="scss">
.editor-root {
    text-align: left;
    height: 100%;
}

.editor-body {
    height: 100%;
    padding-top: 3.25rem; 
}

.editor-textarea, .editor-preview  {
    overflow: hidden;   
    outline: none;
    border: none;
    resize: none;
    width: 100%;
    min-height: calc(100% - 3.25rem);
    padding: 0;
    background-color: transparent;
}
@media (max-width: 575px) {
    .editor-textarea, .editor-preview {
        padding: 0.75rem 1rem;
        margin-top: 0;
        min-height: calc(100vh - 3.25rem - 3.25rem);
    }
}

.editor-preview {
    width: 100%;
    min-height: 10rem;
    word-wrap: break-word;
}

.editor-interface {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3.25rem;
    background-color: $bg-light;
    width: 100%;
    max-width: 680px;
    position: fixed;
    z-index: 990;
    top: 3.25rem;
    transition: top 150ms 0s ease;
}

.editor-interface-on-navbar-hidden {
    top: 0rem;
}

@media (max-width: 575px) {
    .editor-interface {
        padding-left: .75rem;
        padding-right: .75rem;
    }

    .editor-interface-preview {
        font-size: 1.33rem;
    }

    .editor-interface-done {
        font-size: 2rem;
    }
}

.length-counter {
    font-size: 0.8rem;
    line-height: 1.5rem;
}

.icon-rotate {
    animation: rotate 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    /* webkit用animation */
    -webkit-animation: rotate 1s;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;
}
@keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); } 
}
@-webkit-keyframes rotate {
     /* webkit用keyframes */ 
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
}
</style>
