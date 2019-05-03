<template>
    <div class="root">
        <div class="date text-muted mb-2">
            {{ date }}
        </div>
        <div class="pages">
            <Page class="mb-4" v-for="memo in memos" :key="memo.id" :id="memo.id" :memoObject="memo"/>
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
        date: String,
        memos: Array
    }
}
</script>

<style scoped lang="scss">
.date {
    display: flex;
    flex-direction: row;
    align-items: center;
}
</style>
