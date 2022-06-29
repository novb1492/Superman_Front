export default {
    setMap(state,data){
        console.log(data);
        state.map=new window.kakao.maps.Map(data.container, data.options); 
    },
    clearSuperAndMarketMarkerArr(state){
        state.superAndMarketMarkerArr=[];
    },
    setSearchData(state,searchData){
        state.searchData=searchData;
    }
    

}