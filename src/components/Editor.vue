<template>
    <div id="editor" class="editor">
        <div class="editor-header">
            <div class="editor-title">
                <input type="text" class="form-control title text-muted" v-model="title" v-bind:placeholder="titlePlaceholder">
            </div>
            <button type="button" v-bind:class="previewButtonClass" @click="onClickedPreview">
                <i class="fab fa-markdown editor-markdown ml-3"></i>
            </button>
        </div>
        <div v-if="preview" class="bg-paper"></div>
        <div v-else class="form-group bg-paper">
            <textarea name="" id="" rows="10" class="form-control editor-textarea" v-model="body" @keyup="onKeyup"></textarea>
        </div>
        <div class="editor-footer">
            <button type="button" class="icon-btn icon-btn-secondary" v-bind:disabled="editing">
                <i v-bind:class="doneButtonIconClass"></i>  
            </button>
        </div>
    </div>
</template>

<script>
export default {
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
                'fa-ellipsis-h': this.editing,
                'fa-check-circle': !this.editing
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
                }, 1000)
            }
        }
    }
}
</script>


<style scoped>
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
.editor-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
</style>
