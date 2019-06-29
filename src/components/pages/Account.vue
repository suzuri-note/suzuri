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
        <section class="note">
            <div class="note-utilities">
                <ul class="note-filter">
                    <FilterItem 
                        v-for="(value, key) in filters" 
                        :key="key" 
                        :filterType="value.type" 
                        :filterActive="value.active"
                        @click="onClickedFilterItem(key)"
                    />
                </ul>
                <i class="fas fa-search note-search"></i>
            </div>
            <DailyNote v-for="(value, key) in note" :key="key" :date="key" :memos="value"/>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import DailyNote from '@/components/parts/DailyNote.vue';
import FilterItem from '@/components/parts/FilterItem.vue';

import appStore, { StatusLevel } from '@/store/modules/app';
import filterStore from '@/store/modules/filter';
import noteService from '@/services/note';
import noteStore from '@/store/modules/note';
import datelib from '@/lib/datelib';

@Component({ components: { DailyNote, FilterItem } })
export default class AccountPage extends Vue {
    get note() {
        return noteStore.dailyNote;
    }
    get filters() {
        return filterStore.filters;
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
            });
    }

    onClickedFilterItem(index: number): void {
        filterStore.switch(index);
        noteService.filter(filterStore.filters[index].type)
            .then((result: any) => {
                if (result.status === 'success') {
                    noteStore.replaceList(result.data);
                }
            })
            .catch((err: string) => {
                const level = StatusLevel.Warning;
                const message = err;
                appStore.setStatus({ level, message });
            });
    }
}
</script>


<style lang="scss" scoped>
section.profile {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 1rem;
}

.profile-left {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.profile-left i.fa-user-circle {
    font-size: 3.125rem;
    color: #ccc;
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

.note-utilities {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 2rem;
}

.note-filter {
    display: flex;
    flex-direction: row;
    list-style-type: none;
    justify-content: flex-start;
    padding: 0;
}

.note-filter li {
    margin-right: 1rem;
}

</style>

