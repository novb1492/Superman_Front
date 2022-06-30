export default {
    init(context,data) {
        context.commit('setMap',data);
    },
    clearSuperAndMarketMarkerArr(context,superAndMarketMarkerArr){
        for(var ii in superAndMarketMarkerArr){
            superAndMarketMarkerArr[ii].setMap(null);
        }
        context.commit('clearSuperAndMarketMarkerArr');
    },
    setSearchData(context,setSearchData){
        context.commit('setSearchData',setSearchData);
    },
    clearSearchDataArr(context){
        context.commit('clearSearchDataArr');
    }
}