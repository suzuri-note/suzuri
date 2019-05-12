<template>
    <div :class="StatusBarClass">
        <div class="status-message">{{ statueMessage }}</div>
        <button class="icon-btn" @click="onClickedClose"><i class="fas fa-times"></i></button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import appStore, { StatusLevel } from '@/store/modules/app';

export default Vue.extend({
    computed: {
        statueMessage: () => appStore.status.message,
        StatusBarClass: function() {
            return {
                statusbar: true,
                hidden: appStore.status.level === StatusLevel.None,
                'bg-info': appStore.status.level === StatusLevel.Info,
                'bg-warning': appStore.status.level === StatusLevel.Warning,
                'bg-error': appStore.status.level === StatusLevel.Error,
            };
        },
    },
    methods: {
        onClickedClose: function() {
            appStore.resetStatus()
        },
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
    transition: all 300ms 0s ease;
    overflow: hidden;
    position: relative;
}

.status-message {
    text-align: center;
    flex-grow: 1;
}

.hidden {
    transform: translateY(-100%);
}
</style>
