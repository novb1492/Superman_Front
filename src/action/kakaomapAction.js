export default {
    init(context,data) {
        context.commit('setMap',data);
    },
    xyToAddress(context,payload){
        //좌표를 주소로 변환
        var latlng=payload.latlng;
        var geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.coord2Address(latlng.La, latlng.Ma,payload.m);
    },
    searchForAddress(context,payload){
        //인근 지역 키워드로 검색
        var ps = new window.kakao.maps.services.Places(); 
        var keywordArr=payload.keywordArr;
        for(var i in keywordArr){
            ps.keywordSearch(keywordArr[i], payload.callback); 
        }
    }, 
    clearSuperAndMarketMarkerArr(context,superAndMarketMarkerArr){
        for(var ii in superAndMarketMarkerArr){
            superAndMarketMarkerArr[ii].setMap(null);
        }
        context.commit('clearSuperAndMarketMarkerArr');
    }
}