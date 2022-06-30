export default {
    setMap(state,data){
        state.map=new window.kakao.maps.Map(data.container, data.options); 
    },
    clearSuperAndMarketMarkerArr(state){
        state.superAndMarketMarkerArr=[];
    },
    clearSearchDataArr(state){
        state.searchData=[];
    }
    

}