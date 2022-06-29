<template>
    <div id="map" ref="map"></div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'KakaoMap',
  computed: {
    ...mapGetters({
      map: 'getMap'
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
    window.kakao.maps.event.addListener(this.map, 'center_changed',() =>{//중심점 변경시(드래그)인근 마트들 검색
    this.searchForKeyword(this.map.getCenter());
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
    searchForKeyword(latlng){
      console.log(latlng.La);
      //좌표를 주소로 변환
      var geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.coord2Address(latlng.La, latlng.Ma, this.searchMarket);
    },
    searchMarket(result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        var ps = new window.kakao.maps.services.Places(); 
        var address=result[0].address;
        ps.keywordSearch(address.region_1depth_name+' '+address.region_2depth_name+' '+address.region_3depth_name+' 마트', this.showMarkets); 
        ps.keywordSearch(address.region_1depth_name+' '+address.region_2depth_name+' '+address.region_3depth_name+' 슈퍼', this.showMarkets);
      }   
    },
    showMarkets(data, status, pagination){
      if(status === window.kakao.maps.services.Status.OK){
        console.log(data);
        console.log(status);
        console.log(pagination);
        return;
      }
    },
    
  }   
}
</script>


