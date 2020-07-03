<template>
    <nav class="memo-nav">
        <span>
            <router-link :id ="'memo-permalink-' + id" class="text-muted" :to="'/memo/' + id">{{ timestamp }}</router-link>
        </span>
        <div class="buttons" v-click-outside="closeDropdownMenu">
            <button type="button" @click="onOptionClicked" class="icon-btn icon-btn-brand">
                <i class="fas fa-ellipsis-h"></i>
            </button>
        </div>
        <div v-show="optionOpen" class="dropdown-menu">
            <router-link :to="'/edit/' + id" @click.stop.prevent="onEditClicked" class="dropdown-item">Edit</router-link>
            <clipboard-copy :for="'memo-permalink-' + id" @click.stop.prevent="closeDropdownMenu" class="dropdown-item">Copy URL</clipboard-copy>
            <a href="" @click.stop.prevent="onDeleteClicked" class="dropdown-item text-error">Delete</a>
        </div>
    </nav>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';
import ClickOutside from 'vue-click-outside';
import router from '@/router';
import '@github/clipboard-copy-element';

import datelib from '@/lib/datelib';
import en from 'javascript-time-ago/locale/en';

@Component({ directives: { ClickOutside } })
export default class MemoEndPage extends Vue {
    @Prop()
    public id!: string;
    @Prop()
    public updatedAt!: number;

    public optionOpen: boolean;

    public constructor() {
        super();
        this.optionOpen = false;
    }

    get timestamp(): string {
        return datelib.formatForService(this.updatedAt, en);
    }

    public onOptionClicked(): void {
        this.optionOpen = !this.optionOpen;
    }

    public onEditClicked(): void {
        this.optionOpen = false;
    }

    public onDeleteClicked(): void {
        this.clickDelete();
    }

    public closeDropdownMenu(): void {
        this.optionOpen = false;
    }

    @Emit()
    private clickDelete(): void {
        return;
    }
}
</script>

<style lang="scss">
.memo-nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    position: relative;

    height: 2.5rem;
}
</style>
