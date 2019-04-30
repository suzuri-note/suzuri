<template>
    <div class="root">
        <div class="date mb-2">
            <div class="mr-2">
                <a :class="dateLinkClass" @click.prevent="onClickDate" href="#">{{ dailyNote.date }}</a>
            </div>
            <hr v-show="collapse" class="date-hr">
        </div>
        <div v-show="collapse" class="pages">
            <Page class="mb-4" v-for="page in dailyNote.pages" :key="page.id" :title="page.title" :tags="page.tags" :body="page.body"/>
        </div>
    </div>
</template>


<script>
import Page from './Page.vue'
export default {
    components: {
        Page
    },
    props: {
        dailyNote: Object
    },
    data: () => ({
        collapse: true
    }),
    computed: {
        dateLinkClass: function() {
            return {
                'chevron-right': !this.collapse,
                'chevron-down': this.collapse
            }
        },
    },
    methods: {
        onClickDate: function() {
            this.collapse = !this.collapse
        }
    }
}
</script>

<style scoped lang="scss">
.date {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.chevron-right:before {
    content: '\f054';
    font-family: 'Font Awesome 5 Free';
    font-weight: bold;
    margin-right: .5rem;
}
.chevron-down:before {
    content: '\f078';
    font-family: 'Font Awesome 5 Free';
    font-weight: bold;
    margin-right: .5rem;
}
.date-hr {
    width: 100%;
}
</style>
