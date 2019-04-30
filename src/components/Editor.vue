<template>
    <div class="root">
        <div class="editor-header">
            <div class="editor-title">
                <input type="text" class="form-control title text-muted" v-model="title" v-bind:placeholder="titlePlaceholder">
            </div>
            <button type="button" v-bind:class="previewButtonClass" @click="onClickedPreview">
                <i class="fab fa-markdown editor-markdown ml-3"></i>
            </button>
        </div>
        
        <div class="form-group bg-surface">
            <Page v-if="preview" :body="body" class="editor-content"/>
            <textarea v-else name="" id="" class="form-control editor-content" v-model="body" @keyup="onKeyup"></textarea>
        </div>
        <div class="editor-footer">
            <button type="button" class="icon-btn" v-bind:disabled="editing">
                <i v-bind:class="doneButtonIconClass"></i>  
            </button>
        </div>
    </div>
</template>

<script>
import Page from './Page.vue'
export default {
    components: {
        Page
    },
    data: () => ({
        title: "",
        titlePlaceholder: "",
        body: "",
        lastSavedBody: "",
        timeout: null,
        editing: false,
        preview: false
    }),
    created: function() {
        const today = new Date()
        this.titlePlaceholder = today.getFullYear() + "." + today.getMonth() + "." + today.getDate()
    },
    computed: {
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
            this.preview = !this.preview
        },
        onKeyup: function() {
            if (this.body !== this.lastSavedBody) {
                if (this.timeout) {
                    clearTimeout(this.timeout)
                }
                this.editing = true
                var self = this
                this.timeout = setTimeout(function(){
                    console.log('saved: ' + self.body)
                    self.lastSavedBody = self.body
                    self.editing = false
                }, 1500)
            }
        }
    }
}
</script>


<style scoped lang="scss">
input.title {
    font-size: 1.2em;
    border: none;
    border-radius: 0;
    background-color: transparent;
}
input.title:focus {
    outline: 0;
    border: none;
    box-shadow: none;
}
.root {
    display: flex;
    flex-direction: column;
}
.editor-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.editor-content {
    min-height: 20rem;
}
.editor-footer {
    display: flex;
    justify-content: flex-end;
}
.editor-title {
    flex-grow: 1;
}
.editor-markdown {
    display: block;
}
.preview {
    text-align: left;
    min-height: 20rem;
    padding: .5rem 1.0rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #F8FBF8;
    background-clip: padding-box;
    border: 1px solid $border;
    border-radius: .25rem;
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
