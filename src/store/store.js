import actions from '../action/action'
import mutations from '../modulation/mutations'
import Vuex from 'vuex';

export const store = new Vuex.Store({
    state: {
        arr:[1,2,3],
        kWidth:0,
        kHeight:0,
    },
    getters: {
        getArr(state) {
            return state.arr;
        },
        getKwidth(state){
            return state.kWidth;
        },
        getKheight(state){
            return state.kHeight;
        },
        
    },
    mutations,
    actions,
});