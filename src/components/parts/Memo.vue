<template>
    <section class="memo container bg-surface">
        <div class="memo-header">
            <span><a class="text-on-surface" :href="'/memo/' + this.memo.id">{{ memo.createdAt }}</a></span>
            <div class="buttons">
                <button type="button" @click="onClickOption" class="icon-btn icon-btn-brand">
                    <i class="fas fa-ellipsis-h"></i>
                </button>
            </div>
            <div v-show="optionOpen" class="dropdown-menu">
                <router-link :to="'/edit/' + this.memo.id" @click.stop.prevent="onClickEdit" class="dropdown-item">Edit</router-link>
                <a href="" @click.stop.prevent="" class="dropdown-item">Copy URL</a>
                <a href="" @click.stop.prevent="onClickedDelete" class="dropdown-item text-error">Delete</a>
            </div>
        </div>
        <div class="memo-content" @click="onClickedMemoContent">
            <h1>{{ memoSummary.title }}</h1>
            <p>{{ memoSummary.body }}</p>
            <p>`[DEBUG] id:{{ memo.id }}, createdAt: {{ memo.createdAt }}, updatedAt: {{ memo.updatedAt }}`</p>
        </div>
    </section>
</template>

<script lang="ts">
import removeMd from 'remove-markdown';
import { Vue, Component, Prop } from 'vue-property-decorator';

import router from '@/router';

import noteService from '@/services/note';
import noteStore, { IMemoState } from '@/store/modules/note';
import appStore, { StatusLevel } from '@/store/modules/app';

interface IMemoSummary {
    title: string;
    body: string;
}

@Component({})
export default class Memo extends Vue {
    @Prop()
    public memo!: IMemoState;

    public preview: boolean = false;
    public optionOpen: boolean = false;

    get memoSummary(): IMemoSummary {
        const plainText = removeMd(this.memo.body);
        const lines = plainText.split('\n');
        const title = lines[0];
        const body = lines.slice(1).join('\n');
        return { title, body };
    }

    public onClickOption(): void {
        this.optionOpen = !this.optionOpen;
    }

    public onClickEdit(): void {
        this.optionOpen = false;
    }

    public onClickedDelete(): void {
        noteService.remove(this.memo.id)
                .then((result: any): void => {
                    if (result.status === 'success') {
                        noteStore.remove(result.data.id);
                        this.optionOpen = false;
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

    public onClickedMemoContent(): void {
        router.push('/memo/' + this.memo.id );
    }
}
</script>


<style lang="scss">
.memo {
    text-align: left;
    height: auto;
    font-weight: 400;
    background-clip: padding-box;
}

.memo-header {
    padding: 0.75rem 1.0rem;
    border-bottom: 1px solid $border;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    position: relative;

    height: 2.5rem;
}

.memo-content {
    padding: .75rem 1.0rem;
    cursor: pointer;
}
.memo-content h1,
.memo-content h2,
.memo-content h3,
.memo-content h4,
.memo-content h5,
.memo-content h6 {
    font-size: 1rem;
    line-height: 1.5rem;
    height: 1.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.memo-content p {
    color: $text-muted;
    font-size: 0.875rem;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5rem;
    max-height: 4.5rem;
    margin-bottom: 0;

    // chrome & safari only
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
}

.memo-content-textarea {
    overflow: hidden;
    outline: none;
    resize: none;
    width: 100%;
    height: auto;
    min-height: 10rem;
}
.memo-content-buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}
</style>
