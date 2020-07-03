<template>
    <div class="memo-end">
        <MemoNav :id="id" :createdAt="createdAt" :updatedAt="updatedAt" @click-delete="onDeleteClicked"/>
        
        <div class="memo-end-article" v-html="htmlArticle"></div>
        <div class="memo-end-info">
            <span class="text-muted"> {{ `Edited ${timestampUpdatedAt}` }}</span>
            <span class="text-muted"> {{ `Created ${timestampCreatedAt}` }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import router from '@/router';
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt();

import noteService, { ISingleResponse } from '@/services/note';
import appStore, { StatusLevel } from '@/store/modules/app';

import MemoNav from '@/components/parts/MemoNav.vue';

import datelib from '@/lib/datelib';

@Component({ components: { MemoNav } })
export default class MemoEndPage extends Vue {
    public id: string;
    public article: string;
    public updatedAt: number;
    public createdAt: number;
    public optionOpen: boolean;

    public constructor() {
        super();
        this.id = '';
        this.article = '';
        this.updatedAt = 0;
        this.createdAt = 0;
        this.optionOpen = false;
    }

    public created(): void {
        const id = this.$route.params.id;
        console.log(id);
        if (id != undefined) {
            this.id = id;
        }

        document.addEventListener('clipboard-copy', (): void =>  {
            const level = StatusLevel.Info;
            const message = 'URL Copied';
            appStore.setStatus({ level, message });
        });
    }

    get showCreatedAt(): boolean {
        return new Date(this.createdAt).setHours(0, 0, 0, 0) !== new Date(this.updatedAt).setHours(0, 0, 0, 0);
    }

    get timestampUpdatedAt(): string {
        return datelib.formatDatetimeFromUnixtime(this.updatedAt);
    }

    get timestampCreatedAt(): string {
        return datelib.formatDatetimeFromUnixtime(this.createdAt);
    }

    get htmlArticle(): string {
        return md.render(this.article);
    }

    public onDeleteClicked(): void {
        noteService.remove(this.id)
                .then((result: any): void => {
                    if (result.status === 'success') {
                        this.optionOpen = false;
                        router.push('/account');
                        const level = StatusLevel.Info;
                        const message = 'Successfully Deleted';
                        appStore.setStatus({ level, message });
                    }
                })
                .catch((err: Error): void => {
                    const level = StatusLevel.Error;
                    const message = err.toString();
                    appStore.setStatus({ level, message });
                });
    }

    @Watch('id')
    private onIDÇhanged(newID: string): void {
        if (newID !== '') {
        noteService.get(newID)
            .then((result: ISingleResponse): void => {
                if (result.status === 'success') {
                    this.article = result.data.body;
                    this.updatedAt = result.data.updatedAt;
                    this.createdAt = result.data.createdAt;
                }
            })
            .catch((err: Error): void => {
                const level = StatusLevel.Error;
                const message = err.toString();
                appStore.setStatus({ level, message });
            });
        }
    }
}

</script>

<style lang="scss">
.memo-end-article {
    text-align: left;
}

.memo-end-info {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 100%;
}
</style>


