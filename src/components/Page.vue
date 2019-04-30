<template>
    <div class="root">
        <div v-if="title" class="header">
            <div class="meta">
                <div class="title"><a href="#">{{ title }}</a></div>
                <div class="tags">
                    <a v-for="tag in tags" :key="tag.id" :href="'#'+tag.id" class="tag">{{ "#"+tag.title }}</a>
                </div>
            </div>
            <button type="button" @click="onClickOption" class="icon-btn icon-btn-secondary"><i class="fas fa-ellipsis-h"></i></button>
            <div v-show="optionOpen" class="dropdown-menu">
                <a href="" @click.prevent="" class="dropdown-item text-default">Edit</a>
                <a href="" @click.prevent="" class="dropdown-item text-default">Copy URL</a>
                <a href="" @click.prevent="" class="dropdown-item text-error">Delete</a>
            </div>
        </div>
        <div class="content" v-html="htmlBody"></div>
    </div>
</template>

<script>
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

export default {
    props: {
        title: String,
        tags: Array,
        body: String
    },
    data: () => ({
        optionOpen: false
    }),
    computed: {
        htmlBody: function() {
            return md.render(this.body)
        }
    },
    methods: {
        onClickOption: function() {
            this.optionOpen = !this.optionOpen
        }
    }
}
</script>


<style scoped lang="scss">
.root {
    text-align: left;
    height: auto;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #F8FBF8;
    background-clip: padding-box;
    border: 1px solid $border;
    border-radius: .25rem;
}

.header {
    font-size: 1.25rem;
    padding: 0.75rem 1.0rem;
    border-bottom: 1px solid $border;

    display: flex;
    flex-direction: row;

    position: relative;
}

@media screen and (max-width: 576px) {
    .meta {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }
}

@media screen and (min-width: 576px) {
    .meta {
        display: flex;
        flex-direction: row;
        flex-grow: 1;
    }
}


.title {
    margin-right: 1.0rem;
}
.title a {
    color: $text;
}
.tags {
    flex-grow: 1;
}
.tag {
    font-size: .9rem;
    margin-right: 0.5rem;
}

.content {
    padding: .75rem 1.0rem;
}
</style>
