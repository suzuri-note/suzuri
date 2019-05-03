import { Mutation, MutationAction, Action, VuexModule, getModule, Module } from 'vuex-module-decorators';
import store from '@/store';
import dummy from '@/store/modules/note-dummy';

export interface IMemoState {
    id: string;
    title: string;
    body: string;
    createdAt: number;
    updatedAt: number;
}

export interface INoteState {
    memos: IMemoState[];
}

@Module({ dynamic: true, store, name: 'note', namespaced: true})
class Note extends VuexModule implements INoteState {
    // state
    public memos = dummy.memos;

    // actions
    @Action({ commit: 'SAVE' })
    public save(memo: IMemoState) {
        return memo;
    }
    @Action({ commit: 'REMOVE' })
    public remove(id: string) {
        return id;
    }

    // mutation
    @Mutation
    private SAVE(memo: IMemoState) {
        this.memos = this.memos.concat(memo);
    }

    @Mutation
    private REMOVE(id: string) {
        this.memos = this.memos.filter((memo) => (memo.id !== id));
    }

    // actions + mutation
    // incrementCounter, decrementCounter両方をリセットするアクションとミューテーション
    /*
    @MutationAction({mutate: ['incrementCounter', 'decrementCounter']})
    public async resetCounter() {
        return {
            incrementCounter: 0,
            decrementCounter: 1000,
        };
    }
    */
}

export default getModule(Note);
