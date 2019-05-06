import Vue from 'vue';
import Vuex from 'vuex';
import { INoteState } from '@/store/modules/note';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export interface IRootState {
    note: INoteState;
}

export default new Vuex.Store<IRootState>({
    strict: debug,
});
