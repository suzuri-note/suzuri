<template>
    <div :class="StatusBarClass" v-click-outside="onClickedOutside">
        <div class="status-message">{{ statueMessage }}</div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ClickOutside from 'vue-click-outside';

import appStore, { StatusLevel } from '@/store/modules/app';

export default Vue.extend({
    computed: {
        statueMessage: () => appStore.status.message,
        StatusBarClass: function() {
            return {
                statusbar: true,
                hidden: appStore.statusbar.hidden,
                'bg-info': appStore.status.level === StatusLevel.Info,
                'bg-warning': appStore.status.level === StatusLevel.Warning,
                'bg-error': appStore.status.level === StatusLevel.Error,
            };
        },
    },
    methods: {
        onClickedOutside: function() {
            if (!appStore.statusbar.hidden) {
                appStore.resetStatus();
            }
        },
    },
    directives: {
        ClickOutside,
    },
})
</script>

<style scoped lang="scss">
.statusbar {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.2rem 0.75rem;
    font-size: 0.9rem;
    line-height: 1.0rem;
    transition: transform 300ms 0s ease;
    overflow: hidden;
    position: relative;
    transform: translateY(0%);
}

.status-message {
    text-align: center;
    flex-grow: 1;
}

.hidden {
    transform: translateY(-100%);
}
</style>
