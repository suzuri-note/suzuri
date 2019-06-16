<template>
    <div class="root">
        <div class="header">
            <div class="title">
                <div v-show="preview">{{ title }}</div>
                <input v-show="!preview" v-model="title" class="title-input" :placeholder="titlePlaceholder" @keyup="onKeyupTitle"/>
            </div>
            <button type="button" v-bind:class="previewButtonClass" @click="onClickedPreview">
                <i class="fab fa-markdown editor-markdown ml-3"></i>
            </button>
        </div>
        <div class="body inner-container bg-surface mb-2">
            <div v-show="preview" class="body-preview bg-surface" v-html="htmlBody"></div>
            <textarea v-show="!preview" :id="'body-textarea-'+this.id" v-model="body" class="body-textarea bg-surface" @keyup="onKeyupBody"></textarea>
        </div>
        <div class="footer">
            <button type="button" class="icon-btn" @click.stop="onClickedDone" v-bind:disabled="editing">
                <i v-bind:class="doneButtonIconClass"></i>  
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import noteService, { ISingleResponse } from '@/services/note';
import noteStore from '@/store/modules/note';
import appStore, { StatusLevel } from '@/store/modules/app';
import datelib from '@/lib/datelib';
import localstorage from '@/lib/localstorage';

import MarkdownIt from 'markdown-it';
const md = new MarkdownIt();

@Component({})
export default class Editor extends Vue {
    @Prop({ type: String })
    id!: string | null;
    title!: string;
    body!: string;
    lastSavedTitle!: string;
    lastSavedBody!: string;
    titlePlaceholder!: string;
    timeout!: number | null;
    editing!: boolean;
    preview!: boolean;

    constructor() {
        super();
        this.title = '';
        this.body = '';
        this.timeout = null;
        this.editing = false;
        this.preview = false;
    }

    get htmlBody(): string {
        return md.render(this.body);
    }

    get previewButtonClass(): any {
        return {
                'icon-btn': true,
                'icon-btn-muted': !this.preview,
                'icon-btn-primary': this.preview
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

    public created(): void {
        this.titlePlaceholder = datelib.format(new Date());
        if (this.id != null) {
            noteService.get(this.id)
                .then((result: ISingleResponse): void => {
                    if (result.status === 'success') {
                        this.title = result.data.title;
                        this.body = result.data.body;
                    }
                })
                .catch((err: Error): void => {
                    const level = StatusLevel.Error;
                    const message = err.toString();
                    appStore.setStatus({ level, message });
                })
        } else {
            const { title, body } = localstorage.read();
            this.title = title;
            this.body = body;
        }
    }

    public onClickedPreview(): void {
        if (this.title === '') {
            this.title = this.titlePlaceholder;
        }
        this.preview = !this.preview;
        if (!this.preview) {
            this.$nextTick(function() {
                this.adjustBodyHeight() // 本文textareaの高さ調節
            });
        }
    }

    public onKeyupBody(): void {
        this.adjustBodyHeight(); // 本文textareaの高さ調節
        this.autosave(); // localstorageへの保存
    }

    public onKeyupTitle(): void {
        this.autosave(); // localstorageへの保存
    }

    public onClickedDone(): void {
        if (this.body === '') {
            const level = StatusLevel.Warning;
            const message = 'Body text is required';
            appStore.setStatus({ level, message });
            return;
        }
        noteService.save({
            id: '',
            title: this.title === ''? this.titlePlaceholder : this.title,
            body: this.body
        })
        .then((result: ISingleResponse) => {
            if (result.status === 'success') {
                noteStore.save(result.data);
                this.title = '';
                this.body = '';
                this.preview = false;
                localstorage.clear();

                const level = StatusLevel.Info;
                const message = 'Successfully Saved';
                appStore.setStatus({ level, message });
            } 
        })
        .catch((err: Error) => {
            const level = StatusLevel.Error;
            const message = err.toString();
            appStore.setStatus({ level, message });
        })
    }

    private autosave(): void {
            if (this.body !== this.lastSavedBody || this.title !== this.lastSavedTitle) {
                if (this.timeout) {
                    clearTimeout(this.timeout);
                }
                this.editing = true;
                var self = this;
                this.timeout = setTimeout(function(){
                    if (self.title !== self.lastSavedTitle) {
                        localstorage.saveTitle(self.title);
                        self.lastSavedTitle = self.title;
                    }
                    if (self.body !== self.lastSavedBody) {
                        localstorage.saveBody(self.body);
                        self.lastSavedBody = self.body;
                    }
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


    /*data: () => ({
        id: 'new',
        title: '',
        body: '',
        lastSavedTitle: '',
        lastSavedBody: '',
        titlePlaceholder: '',
        timeout: null,
        editing: false,
        preview: false
    }),
    created: function() {
        this.titlePlaceholder = datelib.format(new Date())
        const { title, body } = localstorage.read()
        this.title = title
        this.body = body
    },
    computed: {
        htmlBody: function() {
            return md.render(this.body) 
        },
        previewButtonClass: function () {
            return {
                'icon-btn': true,
                'icon-btn-muted': !this.preview,
                'icon-btn-primary': this.preview
            }
        },
        doneButtonIconClass: function() {
            return {
                fas: true,
                'icon-large': true,

                'fa-circle-notch': this.editing,
                'icon-btn-muted': this.editing,
                'icon-rotate': this.editing,

                'fa-check-circle': !this.editing,
                'icon-btn-primary': !this.editing,
            }
        }
    },
    methods: {
        onClickedPreview: function() {
            if (this.title === '') {
                this.title = this.titlePlaceholder
            }
            this.preview = !this.preview
            if (!this.preview) {
                this.$nextTick(function() {
                    this.adjustBodyHeight() // 本文textareaの高さ調節
                })
            }
        },
        onKeyupBody: function() {
            this.adjustBodyHeight() // 本文textareaの高さ調節
            this.autosave() // localstorageへの保存
        },
        onKeyupTitle: function() {
            this.autosave() // localstorageへの保存
        },
        autosave: function() {
            if (this.body !== this.lastSavedBody || this.title !== this.lastSavedTitle) {
                if (this.timeout) {
                    clearTimeout(this.timeout)
                }
                this.editing = true
                var self = this
                this.timeout = setTimeout(function(){
                    if (self.title !== self.lastSavedTitle) {
                        localstorage.saveTitle(self.title)
                        self.lastSavedTitle = self.title
                    }
                    if (self.body !== self.lastSavedBody) {
                        localstorage.saveBody(self.body)
                        self.lastSavedBody = self.body
                    }
                    self.editing = false
                }, 2000)
            }
        },
        adjustBodyHeight: function() {
            let bodyTextarea = document.getElementById('body-textarea-'+this.id)
            bodyTextarea.style.height = '1px'
            bodyTextarea.style.height = bodyTextarea.scrollHeight + 'px'
        },
        onClickedDone: function() {
            if (this.body === '') {
                const level = StatusLevel.Warning
                const message = 'Body text is required'
                appStore.setStatus({ level, message })
                return
            }
            noteService.save({
                id: '',
                title: this.title === ''? this.titlePlaceholder : this.title,
                body: this.body
            })
            .then(result => {
                if (result.status === 'success') {
                    noteStore.save(result.data)
                    this.title = ''
                    this.body = ''
                    this.preview = ''
                    const level = StatusLevel.Info
                    const message = 'Successfully Saved'
                    appStore.setStatus({ level, message })
                } 
            })
            .catch(err => {
                const level = StatusLevel.Error
                const message = err
                appStore.setStatus({ level, message })
            })
        }
    }*/
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
.title {
    font-size: 1.2rem;
    padding: .5rem .75rem;
    flex-grow: 1;
}
.title-input {
    border: none;
    outline: none;
    border-radius: 0;
    background-color: transparent;
    padding: 0;
    width: 100%;
}
.title-input:hover, .title-input:active {
    outline: 0;
    border: none;
    box-shadow: none;
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
