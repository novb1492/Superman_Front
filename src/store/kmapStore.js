import actions from '../action/kakaomapAction'
import mutations from '../mutaion/kmapMutaions'
import Vuex from 'vuex';

export const kmapStore = new Vuex.Store({
    state: {
        map:null,
        kWidth:0,
        kHeight:0,
        superAndMarketMarkerArr:[],
    },
    getters: {
        getMap(state) {
            return state.map;
        },
        getSuperAndMarketMarkerArr(state){
            return state.superAndMarketMarkerArr;
        },
    },
    mutations,
    actions,
});