<template>
    <div :class="statusBarClass" v-click-outside="onClickedOutside">
        <div class="status-message">{{ statusMessage }}</div>
    </div>
</template>

<script lang="ts">
import ClickOutside from 'vue-click-outside';
import { Component, Vue } from 'vue-property-decorator';

import appStore, { StatusLevel } from '@/store/modules/app';

@Component({ directives: { ClickOutside } })
export default class StatusBar extends Vue {
    get statusMessage(): string {
        return appStore.status.message;
    }

    get statusBarClass(): any {
        return {
                statusbar: true,
                'bg-info': appStore.status.level === StatusLevel.Info,
                'bg-warning': appStore.status.level === StatusLevel.Warning,
                'bg-error': appStore.status.level === StatusLevel.Error,
        };
    }

    onClickedOutside() {
        if (!appStore.statusbar.hidden) {
            appStore.resetStatus();
        }
    }
}
</script>

<style scoped lang="scss">
.statusbar {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.25rem 0.75rem;
    font-size: 0.9rem;
    line-height: 1.0rem;
    overflow: hidden;
    position: relative;
    height: 1.5rem;
}

.status-message {
    text-align: center;
    flex-grow: 1;
}
</style>
