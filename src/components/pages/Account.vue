<template>
    <div>
        <section class="profile">
            <div class="profile-left">
                <i class="fas fa-user-circle"></i>
                <a class="ml-2">You</a>
            </div>
            <div class="profile-right">
                <a>yourmail@your.com</a>
                <i class="fas fa-cog ml-2"></i>
            </div>
        </section>
        <section class="note px-3">
            <DailyNote v-for="(value, key) in note" :key="key" :date="key" :memos="value"/>
        </section>
    </div>
</template>

<script lang="ts">
import DailyNote from '@/components/parts/DailyNote.vue';
import { Component, Vue } from 'vue-property-decorator';

import appStore, { StatusLevel } from '@/store/modules/app';
import noteService from '@/services/note';
import noteStore from '@/store/modules/note';
import datelib from '@/lib/datelib';

@Component({ components: { DailyNote } })
export default class AccountPage extends Vue {
    get note() {
     return noteStore.dailyNote;
    }

    created() {
        noteService.list()
            .then((result: any) => {
                if (result.status === 'success') {
                noteStore.replaceList(result.data);
                }
            })
            .catch((err: string) => {
                const level = StatusLevel.Warning;
                const message = err;
                appStore.setStatus({ level, message });
            })
    }
}
</script>


<style lang="scss" scoped>
section.profile {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.profile-left {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.profile-left i.fa-user-circle {
    font-size: 3.125rem;
}

.profile-right {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
}
.profile-right i.fa-cog {
    font-size: 1.25rem;
}

section.note {
  width: 100%;
  max-width: 680px;
  margin-bottom: 1rem;
}
</style>

