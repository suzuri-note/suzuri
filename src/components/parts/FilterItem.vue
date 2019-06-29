<template>
    <li v-if="label != null">
        <span v-if="filterActive">{{ label }}</span>
        <a v-else href="#" class="text-muted" @click="onClickFilterItem">{{ label }}</a>
    </li>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

import { FilterType } from '@/store/modules/filter';

@Component({})
export default class FilterItem extends Vue {
    @Prop()
    filterType!: string;

    @Prop()
    filterActive!: boolean;

    get label(): string | null {
        switch(this.filterType) {
            case FilterType.All:
                return 'All';
                break;
            case FilterType.Public:
                return 'Public';
                break;
            case FilterType.Private:
                return 'Private';
                break;
            default:
                return null;
        }
    }

    @Emit()
    private click(){
    }

    public onClickFilterItem() {
        this.click();
    }
}
</script>


