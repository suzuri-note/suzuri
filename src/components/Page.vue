<template>
    <div :class="rootClass">
        <div :class="headerClass">
            <input v-if="editMode" v-model="title" type="text" class="title title-input inner-container bg-surface">
            <div v-else class="title"><a class="text-on-surface" href="#">{{ memoObject.title }}</a></div>
            <div class="buttons">
                <button v-show="editMode" type="button" v-bind:class="previewButtonClass" @click="onClickedPreview">
                    <i class="fab fa-markdown editor-markdown ml-3"></i>
                </button>
                <button type="button" @click="onClickOption" class="icon-btn icon-btn-brand">
                    <i class="fas fa-ellipsis-h"></i>
                </button>
            </div>
            <div v-show="optionOpen" class="dropdown-menu">
                <a v-show="!editMode" href="" @click.prevent="onClickEdit" class="dropdown-item">Edit</a>
                <a href="" @click.prevent="" class="dropdown-item">Copy URL</a>
                <a href="" @click.prevent="onClickedDelete" class="dropdown-item text-error">Delete</a>
            </div>
        </div>
        <div v-if="editMode" class="content">
            <div v-if="preview" v-html="htmlDataBody" class="content-textarea inner-container bg-surface"></div>
            <textarea v-else v-model="body" :id="'textarea-'+this.memoObject.id" class="content-textarea inner-container bg-surface" @keyup="onKeyupBody"></textarea>
            <div class="content-buttons mt-2">
                <button type="button" class="btn btn-secondary mr-2" @click="onClickedCancel">Cancel</button>
                <button type="button" class="btn btn-primary" @click="onClickedSave">Save</button>
            </div>
        </div>
        <div v-else class="content">
            <div v-html="htmlBody"></div>
            <p>`[DEBUG] id:{{ memoObject.id }}, createdAt: {{ memoObject.createdAt }}, updatedAt: {{ memoObject.updatedAt }}`</p>
        </div>
    </div>
</template>

<script>
import noteService from '@/services/note'
import noteStore from '@/store/modules/note'
import appStore, { StatusLevel } from '@/store/modules/app'

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
                'root-editMode': this.editMode,
                'bg-surface': !this.editMode,
                'container': !this.editMode
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
                'icon-btn-muted': !this.preview,
                'icon-btn-primary': this.preview
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
            this.preview = false
        },
        onClickedSave: function() {
            noteService.save({
                id: this.memoObject.id,
                title: this.title? this.title : this.titlePlaceholder,
                body: this.body
            })
            .then(result => {
                if (result.status === "success") {
                    noteStore.save(result.data)
                    this.editMode = false
                    this.preview = false
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
        },
        onKeyupBody: function() {
            this.adjustBodyHeight()
        },
        adjustBodyHeight: function() {
            if (this.editMode) {
                let textarea = document.getElementById('textarea-'+this.memoObject.id)
                textarea.style.height = '1px'
                textarea.style.height = textarea.scrollHeight + 'px'                
            }
        },
        onClickedDelete: function() {
            noteService.remove(this.memoObject.id)
                .then(result => {
                    if (result.status === 'success') {
                        note.remove(result.data.id)
                        this.optionOpen = false
                        const level = StatusLevel.Info
                        const message = 'Successfully Deleted'
                        appStore.setStatus({ level, message })
                    }
                })
                .catch(err => {
                    const level = StatusLevel.Error
                    const message = err
                    appStore.setStatus({ level, message })
                })
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
    background-clip: padding-box;
}
.root-editMode {
    background-color: transparent;
    border: none;
}

.header {
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
    font-size: 1.2rem;
}

.content {
    padding: .75rem 1.0rem;
}

.title-input {
    flex-grow:1;
}
.content-textarea {
    overflow: hidden;   
    outline: none;
    resize: none;
    width: 100%;
    height: auto;
    min-height: 10rem;
}
.content-buttons {
    display: flex;  
    flex-direction: row;
    justify-content: flex-end;
}
</style>
