<template>
    <div class="root">
        <div class="date text-muted mb-2">
            <span>{{ date }}</span>
        </div>
        <div class="pages">
            <Memo class="mb-4" v-for="memo in memos" :key="memo.id" :id="memo.id" :memoObject="memo"/>
        </div>
    </div>
</template>


<script lang="ts">
import Memo from '@/components/parts/Memo.vue';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IMemoState } from '@/store/modules/note';

@Component({ components: { Memo } })
export default class DialyNote extends Vue {
    @Prop()
    public date!: string;

    @Prop()
    public memos!: IMemoState[];
}
</script>

<style scoped lang="scss">
.date {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
