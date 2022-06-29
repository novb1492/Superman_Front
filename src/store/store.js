import actions from '../action/action'
import mutations from '../modulation/mutations'
import Vuex from 'vuex';

export const store = new Vuex.Store({
    state: {
        arr:[1,2,3]
    },
    getters: {
        getArr(state) {
            return state.arr;
        },
        
    },
    mutations,
    actions,
});