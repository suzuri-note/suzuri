<template>
    <div class="root">
        <div class="body inner-container mb-2">
            <div v-show="preview" class="body-preview" v-html="htmlBody"></div>
            <textarea v-show="!preview" :id="'body-textarea-'+this.id" v-model="bodyModel" class="body-textarea" @input="onInput"></textarea>
        </div>
        <div class="editor-footer">
            <span class="length-counter text-muted">{{ body.length }}</span>
            <button type="button" v-bind:class="previewButtonClass" @click="onClickedPreview">
                <i class="fab fa-markdown editor-markdown ml-3"></i>
            </button>
            <button type="button" class="icon-btn" @click.stop="onClickedDone" v-bind:disabled="editing">
                <i v-bind:class="doneButtonIconClass"></i>  
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';

import noteService, { ISingleResponse } from '@/services/note';
import noteStore from '@/store/modules/note';
import appStore, { StatusLevel } from '@/store/modules/app';
import datelib from '@/lib/datelib';
import localstorage from '@/lib/localstorage';

import MarkdownIt from 'markdown-it';
const md = new MarkdownIt();

@Component({})
export default class Editor extends Vue {
    @Prop()
    id!: string | null;
    @Prop()
    body!: string;
    @Prop()
    preview!: boolean;

    lastSavedBody!: string;
    timeout!: number | null;
    editing!: boolean;

    @Emit()
    private clickedPreview(){
    }

    @Emit()
    private clickedDone(){
    }

    @Emit()
    private autosaveEmitted(){
    }

    @Emit()
    private changedBody(newValue: string){
    }
    
    constructor() {
        super();
        this.timeout = null;
        this.editing = false;
    }

    public mounted() {
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

    get previewButtonClass(): any {
        return {
            'icon-btn': true,
            'icon-btn-muted': !this.preview,
            'icon-btn-primary': this.preview,
        };
    }

    get doneButtonIconClass(): any {
        return {
            fas: true,
            'icon-large': true,
            'icon-btn-muted': true,

            'fa-circle-notch': this.editing,
            'icon-rotate': this.editing,

            'fa-check-circle': !this.editing,
        };
    }

    
    
    public onClickedPreview(): void {
        this.clickedPreview();
    }

    public onInput(): void {
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
                this.adjustBodyHeight() // 本文textareaの高さ調節
            });
        }
    }

    /*@Watch('body')
    public onChangedBody(val: boolean, oldVal: boolean): void {
        this.adjustBodyHeight(); // 本文textareaの高さ調節
        this.autosave(); // localstorageへの保存
    }*/

    private autosave(): void {
        if (this.body !== this.lastSavedBody) {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            this.editing = true;
            var self = this;
            this.timeout = setTimeout(function(){
                self.autosaveEmitted();
                self.lastSavedBody = self.body;
                self.editing = false;
            }, 2000);
        }
    }

    private adjustBodyHeight(): void {
        let bodyTextarea: HTMLElement | null = document.getElementById('body-textarea-'+this.id);
        if (bodyTextarea != null) {
            // Save the scrollLeft, scrollTop values
            // ref. https://stackoverflow.com/questions/18262729/how-to-stop-window-jumping-when-typing-in-autoresizing-textarea/18262927#18262927
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

            console.log('before', scrollLeft, scrollTop);
            bodyTextarea.style.height = 'auto';
            bodyTextarea.style.height = bodyTextarea.scrollHeight + 'px';

            const scrollLeftAfter = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
            const scrollTopAfter = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            console.log('after', scrollLeftAfter, scrollTopAfter);
            
            // Restore the scrollLeft, scrollTop values after resizing the textarea
            window.scrollTo(scrollLeft, scrollTop);
        }
    }
}
</script>


<style scoped lang="scss">
.root {
    text-align: left;
}

.body-textarea {
    overflow: hidden;   
    outline: none;
    border: none;
    resize: none;
    width: 100%;
    height: auto;
    min-height: 10rem;
    padding: 0;
    background-color: transparent;
}
.body-preview {
    min-height: 10rem;
}


.editor-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
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
