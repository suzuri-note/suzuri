<template>
    <div :class="rootClass">
        <div :class="headerClass">
            <input v-if="editMode" v-model="title" type="text" class="title title-input">
            <div v-else class="title"><a href="#">{{ memoObject.title }}</a></div>
            <div class="buttons">
                <button v-show="editMode" type="button" v-bind:class="previewButtonClass" @click="onClickedPreview">
                    <i class="fab fa-markdown editor-markdown ml-3"></i>
                </button>
                <button type="button" @click="onClickOption" class="icon-btn icon-btn-secondary">
                    <i class="fas fa-ellipsis-h"></i>
                </button>
            </div>
            <div v-show="optionOpen" class="dropdown-menu">
                <a v-show="!editMode" href="" @click.prevent="onClickEdit" class="dropdown-item text-default">Edit</a>
                <a href="" @click.prevent="" class="dropdown-item text-default">Copy URL</a>
                <a href="" @click.prevent="" class="dropdown-item text-error">Delete</a>
            </div>
        </div>
        <div v-if="editMode" class="content">
            <div v-if="preview" v-html="htmlDataBody" class="content-textarea"></div>
            <textarea v-else v-model="body" :id="'textarea-'+id" class="content-textarea" @keyup="onKeyupBody"></textarea>
            <div class="content-buttons mt-2">
                <button type="button" class="btn btn-secondary mr-2" @click="onClickedCancel">Cancel</button>
                <button type="button" class="btn btn-primary" @click="onClickedSave">Save</button>
            </div>
        </div>
        <div v-else class="content">
            <div v-html="htmlBody"></div>
        </div>
    </div>
</template>

<script>
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

export default {
    props: {
        memoObject: Object,
    },
    data: () => ({
        title: "",
        body: "",
        preview: false,
        optionOpen: false,
        editMode: false
    }),
    computed: {
        htmlBody: function() {
            return md.render(this.memoObject.body)
        },
        htmlDataBody: function() {
            return md.render(this.body)
        },
        rootClass: function() {
            return {
                'root': true,
                'root-editMode': this.editMode
            }
        },
        headerClass: function() {
            return {
                'header': true,
                'header-editMode': this.editMode
            }
        },
        previewButtonClass: function () {
            return {
                'icon-btn': true,
                'icon-btn-border': !this.preview,
                'icon-btn-secondary': this.preview
            }
        },
    },
    methods: {
        onClickOption: function() {
            this.optionOpen = !this.optionOpen
        },
        onClickEdit: function() {
            this.editMode = true
            this.optionOpen = false
            this.$nextTick(function() {
                this.adjustBodyHeight()
            })
        },
        onClickedPreview: function() {
            if (this.title === "") {
                this.title = this.titlePlaceholder
            }
            this.preview = !this.preview
            this.$nextTick(function() {
                if(!this.preview) {
                    this.adjustBodyHeight()
                }
            })
        },
        onClickedCancel: function() {
            this.editMode = false
        },
        onClickedSave: function() {
            return
        },
        onKeyupBody: function() {
            this.adjustBodyHeight()
        },
        adjustBodyHeight: function() {
            if (this.editMode) {
                let textarea = document.getElementById('textarea-'+this.id)
                textarea.style.height = '1px'
                textarea.style.height = textarea.scrollHeight + 'px'                
            }
        }
    },
    created: function() {
        this.title = this.memoObject.title
        this.body = this.memoObject.body
    }
}
</script>


<style scoped lang="scss">
.root {
    text-align: left;
    height: auto;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5rem;
    color: #495057;
    background-color: $surface;
    background-clip: padding-box;
    border: 1px solid $border;
    border-radius: .25rem;
}
.root-editMode {
    background-color: transparent;
    border: none;
}

.header {
    font-size: 1.2rem;
    padding: 0.75rem 1.0rem;
    border-bottom: 1px solid $border;
    
    display: flex;
    flex-direction: row;
    align-items: center;

    position: relative;
}
.header-editMode {
    border-bottom: none;
}


.title {
    flex-grow: 1;
    margin-right: 1.0rem;
}
.title a {
    color: $text;
}

.content {
    padding: .75rem 1.0rem;
}

.title-input {
    outline: none;
    border: none;
    background-color: $surface;
    color: $text;
    flex-grow:1;

    border: 1px solid $border;
    border-radius: .25rem;
    padding: .25rem .5rem;
}
.content-textarea {
    overflow: hidden;   
    outline: none;
    border: 1px solid $border;
    background-color: $surface;
    color: $text;
    resize: none;
    width: 100%;
    height: auto;
    border-radius: .25rem;
    padding: .25rem .5rem;
    min-height: 10rem;
}
.content-buttons {
    display: flex;  
    flex-direction: row;
    justify-content: flex-end;
}
</style>
