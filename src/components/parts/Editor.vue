<template>
    <div class="root">
        <div class="header">
            <button type="button" v-bind:class="previewButtonClass" @click="onClickedPreview">
                <i class="fab fa-markdown editor-markdown ml-3"></i>
            </button>
        </div>
        <div class="body inner-container bg-surface mb-2">
            <div v-show="preview" class="body-preview bg-surface" v-html="htmlBody"></div>
            <textarea v-show="!preview" :id="'body-textarea-'+this.id" v-model="bodyModel" class="body-textarea bg-surface" @keyup="onKeyupBody"></textarea>
        </div>
        <div class="footer">
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

            'fa-circle-notch': this.editing,
            'icon-btn-muted': this.editing,
            'icon-rotate': this.editing,

            'fa-check-circle': !this.editing,
            'icon-btn-primary': !this.editing,
        };
    }

    
    
    public onClickedPreview(): void {
        this.clickedPreview();
    }

    public onKeyupBody(): void {
        this.adjustBodyHeight(); // 本文textareaの高さ調節
        this.autosave(); // localstorageへの保存
        console.log(this.body);
    }

    public onKeyupTitle(): void {
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
            bodyTextarea.style.height = '1px';
            bodyTextarea.style.height = bodyTextarea.scrollHeight + 'px';
        }
    }
}
</script>


<style scoped lang="scss">
.root {
    text-align: left;
}
.header {
    display: flex;
    flex-direction: row;
    min-height: 2.0rem;
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
}
.body-preview {
    min-height: 10rem;
}


.footer {
    display: flex;
    justify-content: flex-end;
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
