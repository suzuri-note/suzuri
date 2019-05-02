<template>
    <div class="root">
        <div class="date mb-2">
            {{ dailyNote.date }}
        </div>
        <div class="pages">
            <Page class="mb-4" v-for="memo in dailyNote.memos" :key="memo.id" :id="memo.id" :memoObject="memo"/>
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
    }
}
</script>

<style scoped lang="scss">
.date {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: $border;
}
</style>
