import { Mutation, MutationAction, Action, VuexModule, getModule, Module } from 'vuex-module-decorators';
import store from '@/store';
import datelib from '@/lib/datelib';

export interface IMemoState {
    id: string;
    title: string;
    body: string;
    createdAt: number;
    updatedAt: number;
}

// memosを日付ごとに整理したもの
export interface IDailyNoteState {
    [date: string]: IMemoState[];
}

export interface INoteState {
    dailyNote: IDailyNoteState;
}

@Module({ dynamic: true, store, name: 'note', namespaced: true})
class Note extends VuexModule implements INoteState {
    // private state
    private memos: IMemoState[] = [];

    // getter
    get dailyNote(): IDailyNoteState {
        const tmpMemos = this.memos.concat();
        tmpMemos.sort((a: IMemoState, b: IMemoState): number => {
            if (a.createdAt > b.createdAt) { return -1; }
            if (a.createdAt < b.createdAt) { return 1; }
            return 0;
        });
        return tmpMemos.reduce((accumulator: IDailyNoteState, currentValue: IMemoState): IDailyNoteState => {
            const yyyymmdd: string = datelib.formatFromUnixtime(currentValue.createdAt);
            accumulator[yyyymmdd] = accumulator[yyyymmdd] ? accumulator[yyyymmdd].concat(currentValue) : [currentValue];
            return Object.assign({}, accumulator);
        }, {});
    }

    // actions
    @Action
    public save(memo: IMemoState): void {
        this.SAVE(memo);
    }
    @Action
    public replaceList(memos: IMemoState[]): void {
        this.REPLACE_LIST(memos);
    }
    @Action
    public remove(id: string): void {
        this.REMOVE(id);
    }

    // mutation
    @Mutation
    private SAVE(memo: IMemoState) {
        for (const i in this.memos) {
            if (this.memos[i].id === memo.id) {
                const newMemos = this.memos.concat();
                newMemos[i] = memo;
                this.memos = newMemos;
                return;
            }
        }
        this.memos = this.memos.concat(memo);
    }

    @Mutation
    private REPLACE_LIST(memos: IMemoState[]) {
        this.memos = memos;
    }

    @Mutation
    private REMOVE(id: string) {
        this.memos = this.memos.filter((memo) => (memo.id !== id));
    }
}

export default getModule(Note);
