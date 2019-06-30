<template>
    <section class="memo container bg-surface">
        <div class="memo-header">
            <span><a id ="memo-permalink" class="text-muted" :href="'/memo/' + this.memo.id">{{ timestamp }}</a></span>
            <div class="buttons" v-click-outside="closeDropdownMenu">
                <button type="button" @click="onClickOption" class="icon-btn icon-btn-brand">
                    <i class="fas fa-ellipsis-h"></i>
                </button>
            </div>
            <div v-show="optionOpen" class="dropdown-menu">
                <router-link :to="'/edit/' + this.memo.id" @click.stop.prevent="onClickEdit" class="dropdown-item">Edit</router-link>
                <clipboard-copy for="memo-permalink" @click.stop.prevent="closeDropdownMenu" class="dropdown-item">Copy URL</clipboard-copy>
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
import { Vue, Component, Prop } from 'vue-property-decorator';
import ClickOutside from 'vue-click-outside';
import router from '@/router';

import noteService from '@/services/note';
import noteStore, { IMemoState } from '@/store/modules/note';
import appStore, { StatusLevel } from '@/store/modules/app';
import datelib from '@/lib/datelib';

import removeMd from 'remove-markdown';
import '@github/clipboard-copy-element';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

interface IMemoSummary {
    title: string;
    body: string;
}

@Component({ directives: { ClickOutside } })
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

    get timestamp(): string {
        const today = new Date().setHours(0, 0, 0, 0);
        if (this.memo.updatedAt >= today) {
            return timeAgo.format(this.memo.updatedAt);
        } else {
            return datelib.formatFromUnixtime(this.memo.updatedAt);
        }
    }

    public created(): void {
        document.addEventListener('clipboard-copy', (): void =>  {
            const level = StatusLevel.Info;
            const message = 'URL Copied';
            appStore.setStatus({ level, message });
        });
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

    public closeDropdownMenu(): void {
        this.optionOpen = false;
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

clipboard-copy {
    cursor: pointer;
}
</style>
