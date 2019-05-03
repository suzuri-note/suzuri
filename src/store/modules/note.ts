import { Mutation, MutationAction, Action, VuexModule, getModule, Module } from 'vuex-module-decorators';
import store from '@/store';

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
    public memos: IMemoState[] = [];

    // actions
    @Action({ commit: 'SAVE' })
    public save(memo: IMemoState) {
        return memo;
    }
    @Action({ commit: 'REPLACE_LIST' })
    public replaceList(memos: IMemoState[]) {
        return memos;
    }
    @Action({ commit: 'REMOVE' })
    public remove(id: string) {
        return id;
    }

    // mutation
    @Mutation
    private SAVE(memo: IMemoState) {
        for (const i in this.memos) {
            if (this.memos[i].id === memo.id) {
                let newMemos = this.memos.concat()
                newMemos[i] = memo
                this.memos = newMemos
                return
            }
        }
        this.memos = this.memos.concat(memo)
    }

    @Mutation
    private REPLACE_LIST(memos: IMemoState[]) {
        this.memos = memos;
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
