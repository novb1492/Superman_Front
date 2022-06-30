export default {
    setMap(state,data){
        state.map=new window.kakao.maps.Map(data.container, data.options); 
    },
    clearSuperAndMarketMarkerArr(state){
        state.superAndMarketMarkerArr=[];
    },
    setSearchData(state,searchData){
        if(searchData!=null&&searchData!=undefined){
            state.searchData[state.searchData.length]=searchData;
        }
    },
    clearSearchDataArr(state){
        state.searchData=[];
    }
    

}