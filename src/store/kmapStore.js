import actions from '../action/kakaomapAction'
import mutations from '../modulation/kmapMutaions'
import Vuex from 'vuex';

export const kmapStore = new Vuex.Store({
    state: {
        map:null,
        kWidth:0,
        kHeight:0,
    },
    getters: {
        getMap(state) {
            return state.map;
        },
    },
    mutations,
    actions,
});