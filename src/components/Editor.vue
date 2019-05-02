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
        <div class="body mb-2">
            <div v-show="preview" class="body-preview" :id="'body-preview-'+this.id" v-html="htmlBody"></div>
            <textarea v-show="!preview" :id="'body-textarea-'+this.id" v-model="body" class="body-textarea" @keyup="onKeyupBody"></textarea>
        </div>
        <div class="footer">
            <button type="button" class="icon-btn" v-bind:disabled="editing">
                <i v-bind:class="doneButtonIconClass"></i>  
            </button>
        </div>
    </div>
</template>

<script>
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

export default {
    data: () => ({
        id: "new",
        title: "",
        body: "",
        lastSavedTitle: "",
        lastSavedBody: "",
        titlePlaceholder: "",
        timeout: null,
        editing: false,
        preview: false
    }),
    created: function() {
        // initialize
        const today = new Date()
        this.titlePlaceholder = today.getFullYear() + "." + today.getMonth() + "." + today.getDate()
    },
    computed: {
        htmlBody: function() {
            return md.render(this.body) 
        },
        previewButtonClass: function () {
            return {
                'icon-btn': true,
                'icon-btn-border': !this.preview,
                'icon-btn-secondary': this.preview
            }
        },
        doneButtonIconClass: function() {
            return {
                fas: true,
                'icon-large': true,

                'fa-circle-notch': this.editing,
                'icon-btn-border': this.editing,
                'icon-rotate': this.editing,

                'fa-check-circle': !this.editing,
                'icon-btn-secondary': !this.editing,
            }
        }
    },
    methods: {
        onClickedPreview: function() {
            if (this.title === "") {
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
                    console.log('saved: ' + self.body)
                    self.lastSavedTitle = self.title
                    self.lastSavedBody = self.body
                    self.editing = false
                }, 1500)
            }
        },
        adjustBodyHeight: function() {
            let bodyTextarea = document.getElementById('body-textarea-'+this.id)
            bodyTextarea.style.height = '1px'
            bodyTextarea.style.height = bodyTextarea.scrollHeight + 'px'

            let bodyPreview = document.getElementById('body-preview-'+this.id)
            bodyPreview.style.height = '1px'
            bodyPreview.style.height = bodyTextarea.scrollHeight + 'px'
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
    color: $text;
    padding: 0;
    width: 100%;
}
.title-input:hover, .title-input:active {
    outline: 0;
    border: none;
    box-shadow: none;
}

.body {
    border: 1px solid $border;
    border-radius: .25rem;
    padding: .5rem .75rem;
    background-color: $surface;
}
.body-textarea {
    overflow: hidden;   
    outline: none;
    border: none;
    background-color: transparent;
    color: $text;
    resize: none;
    width: 100%;
    height: auto;
    min-height: 10rem;
    padding: 0;
}
.body-preview {
    min-height: 10rem;
    overflow: scroll;
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
