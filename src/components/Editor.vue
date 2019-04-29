<template>
    <div class="editor">
        <div class="editor-header">
            <div class="editor-title">
                <input type="text" class="form-control title text-muted" value="2019.04.28 No.1">
            </div>
            <button class="icon-btn icon-btn-border">
                <i class="fab fa-markdown editor-markdown ml-3"></i>
            </button>
        </div>
        <div class="form-group bg-paper">
            <textarea name="" id="" rows="10" class="form-control"></textarea>
        </div>
        <div class="editor-footer">
            <button type="button" class="icon-btn icon-btn-secondary">
                <i class="fas fa-check-circle icon-large"></i>
            </button>
        </div>
    </div>
</template>

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
textarea {
    resize: vertical;
}
</style>
