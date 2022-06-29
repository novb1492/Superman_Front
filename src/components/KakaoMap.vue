<template>
  <div ref="placeName"></div>
    <div id="map" ref="map"></div>
    <div ref="placeName"></div>
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
        var keywords=[address.region_1depth_name+' '+address.region_2depth_name+' '+address.region_3depth_name+' 마트',address.region_1depth_name+' '+address.region_2depth_name+' '+address.region_3depth_name+' 슈퍼'];
        this.$store.dispatch('clearSuperAndMarketMarkerArr',this.superAndMarketMarkerArr);//기존 마커들 지우기
        this.$store.dispatch('searchForAddress',{keywordArr: keywords,callback:this.showMarkets});//키워드 검색
        return;
      }   
    },
    showMarkets(data, status, pagination){
      if(status === window.kakao.maps.services.Status.OK){
        for(var i in data){
          console.log(data);
            var marker = this.setMarker(data[i]);
            // 마커에 마우스오버 이벤트를 등록합니다
            window.kakao.maps.event.addListener(marker, 'mouseover', ()=> {
              this.$refs.placeName.innerHTML="<span>"+data[i].place_name+'</span>';
            });
            // 마커에 마우스아웃 이벤트를 등록합니다
            window.kakao.maps.event.addListener(marker, 'mouseout',()=> {
              this.$refs.placeName.innerHTML="";
            });
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

    
  }   
}
</script>


