<template>
  <div ref="placeName"></div>
  <div id="map" ref="map"></div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'KakaoMap',
  computed: {
    ...mapGetters({
      map: 'getMap',
      superAndMarketMarkerArr:'getSuperAndMarketMarkerArr',
    })
  },
  mounted(){
    var values=new Object;
    values.container=this.$refs.map; //지도를 담을 영역의 DOM 레퍼런스
    values.options= { //지도를 생성할 때 필요한 기본 옵션
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 3 //지도의 레벨(확대, 축소 정도)
    };
    this.$store.dispatch('init',values); //지도 생성
    this.setDomSize(window.innerWidth,window.innerHeight);//돔 사이즈 지정
    window.addEventListener('resize',this.setDomResize);// 리사이즈 이벤트 지정
    window.kakao.maps.event.addListener(this.map, 'dragend',() =>{//중심점 변경시(드래그)인근 마트들 검색
    var latlng=this.map.getCenter();
    var b=this.searchMarket;
    this.$store.dispatch('xyToAddress',{latlng: latlng,m:b});//좌표=>주소
  });
  },
  methods:{
    setDomSize(width,height){
      var domMap=this.$refs.map;
      domMap.style.width=width+'px';
      domMap.style.height=height+'px';
      this.map.relayout();
    },
    setDomResize(){
      this.setDomSize(window.innerWidth,window.innerHeight);
    },
    searchMarket(result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        //키워드로 검색 ex) 서울 동작구 마트
        var address=result[0].address;
        var keywords=[address.region_1depth_name+' '+address.region_2depth_name+' '+address.region_3depth_name+' 슈퍼마켓',address.region_1depth_name+' '+address.region_2depth_name+' '+address.region_3depth_name+' 마트',address.region_1depth_name+' '+address.region_2depth_name+' '+address.region_3depth_name+' 슈퍼'];
        this.$store.dispatch('clearSuperAndMarketMarkerArr',this.superAndMarketMarkerArr);//기존 마커들 지우기
        this.$store.dispatch('searchForAddress',{keywordArr: keywords,callback:this.showMarkets});//키워드 검색
        return;
      }   
    },
    showMarkets(data, status, pagination){
      console.log(pagination);
      if(status === window.kakao.maps.services.Status.OK){
        this.$store.dispatch('setSearchData',{setSearchData: data});//상위 컴포넌트 사용위해 저장
        for(var i in data){
          //console.log(data);
            var marker = this.setMarker(data[i]);
            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(this.map);
            this.superAndMarketMarkerArr[this.superAndMarketMarkerArr.length]=marker;
        }
        if(pagination.hasNextPage){
          pagination.nextPage();
        }
        return;
      }
    },
    setMarker(latLng){
        return new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(latLng.y, latLng.x)
        });
    },
    changeFocus(x,y){
      this.map.panTo(new window.kakao.maps.LatLng(y, x));
      var iwContent = '<div style="padding:5px;"><a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a></div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      iwPosition = new window.kakao.maps.LatLng(y, x); //인포윈도우 표시 위치입니다
      // 인포윈도우를 생성합니다
      var infowindow = new window.kakao.maps.InfoWindow({
          position : iwPosition, 
          content : iwContent 
      });
      // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
      infowindow.open(this.map);
      var data=new Object; 
      data.x=x;
      data.y=y;
      //안그려져 있을 수 있으니 마커 생성
      var marker = this.setMarker(data);
      marker.setMap(this.map);
    },  
    
  }   
}
</script>


