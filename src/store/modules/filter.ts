import { Mutation, MutationAction, Action, VuexModule, getModule, Module } from 'vuex-module-decorators';
import store from '@/store';

export interface IFilterState {
    filters: IFilter[];
    activeFilterType: FilterType;
}

export interface IFilter {
    type: FilterType;
    active: boolean;
}

export enum FilterType {
    All = 'ALL',
    Public = 'PUBLIC',
    Private = 'PRIVATE',
}

@Module({ dynamic: true, store, name: 'filter', namespaced: true })
class Filter extends VuexModule implements IFilterState {
    public filters: IFilter[] = [
        { type: FilterType.All, active: true },
        { type: FilterType.Public, active: false},
        { type: FilterType.Private, active: false },
    ];

    private activeFilterIndex: number = 0;

    get activeFilterType(): FilterType {
        return this.filters[this.activeFilterIndex].type;
    }

    @Action
    public switch(index: number): void {
        this.SWITCH(index);
    }

    @Mutation
    private SWITCH(index: number): void {
        this.activeFilterIndex = index;
        this.filters.forEach((currentFilter: IFilter, currentIndex: number) => {
            if (currentIndex === index) {
                this.filters[currentIndex].active = true;
            } else {
                this.filters[currentIndex].active = false;
            }
        });
    }
}

export default getModule(Filter);
