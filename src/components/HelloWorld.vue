<template>
     <swiper
    :slides-per-view="4"
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  > 
 

  <swiper-slide v-for="(item,index)  in searchDataArr" :key="index">
  <div @mouseover="moveXy(item,index)">{{index}}</div>
  </swiper-slide>
  </swiper>
  <kakao-map ref="kmap" :height="kmapHeight" :width="kmapWidth" :resizeWidth="resizeWidth" :resizeHeight="resizeHeight"></kakao-map>
</template>

<script>
import KakaoMap from './KakaoMap.vue';
// Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';
import { mapGetters } from 'vuex';
export default {
  components: { KakaoMap,Swiper,SwiperSlide, },
  name: 'HelloWorld',
  data() {
    return {
      kmapWidth:window.innerWidth,
      kmapHeight:window.innerHeight,
      resizeWidth:window.innerWidth,
      resizeHeight:window.innerHeight,
      arr:[],
    }
  },
  computed: {
    ...mapGetters({
      map: 'getMap',
      superAndMarketMarkerArr:'getSuperAndMarketMarkerArr',
    })
  },
  setup() {
      const onSwiper = (swiper) => {
        console.log(swiper);
      };
      const onSlideChange = () => {
        console.log('slide change');
      };
      return {
        onSwiper,
        onSlideChange,
      };
  },
  mounted(){
    window.kakao.maps.event.addListener(this.map, 'dragend',() =>{//중심점 변경시(드래그)인근 마트들 검색
      this.xyToAddress();
      
    });
  },
  methods:{
    xyToAddress(){
        //좌표를 주소로 변환
        var latlng=this.map.getCenter();
        var geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.coord2Address(latlng.La, latlng.Ma,this.searchMarket);
    },
    moveXy(item,index){
      console.log(index);
      this.$refs.kmap.changeFocus(item.setSearchData[index]);
    },
    searchMarket(result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        //키워드로 검색 ex) 서울 동작구 마트
        var address=result[0].address;
        var keywords=[address.region_1depth_name+' '+address.region_2depth_name+' '+address.region_3depth_name+' 슈퍼마켓',address.region_1depth_name+' '+address.region_2depth_name+' '+address.region_3depth_name+' 마트',address.region_1depth_name+' '+address.region_2depth_name+' '+address.region_3depth_name+' 슈퍼'];
        // this.$store.dispatch('clearSearchDataArr');//기존 마커들 지우기
        this.$store.dispatch('clearSuperAndMarketMarkerArr',this.superAndMarketMarkerArr);//기존 마커들 지우기
        this.search(keywords);
        return;
      }   
    },
    search(keywords){
      var ps = new window.kakao.maps.services.Places(); 
      for(var i in keywords){
        ps.keywordSearch(keywords[i], this.setAllData); 
      }
    },
    setAllData(data, status, pagination){
        if (status === window.kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        this.displayPlaces(data);
        // 페이지 번호를 표출합니다
        this.displayPagination(pagination);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          alert('검색 결과가 존재하지 않습니다.');
          return;
      } else if (status === window.kakao.maps.services.Status.ERROR) {
          alert('검색 결과 중 오류가 발생했습니다.');
          return;
      }

    },
    displayPagination(pagination) {
      if(pagination.hasNextPage){
        pagination.nextPage();
      }
    },
    displayPlaces(data){ 
        for(var i in data){
            var marker = this.setMarker(data[i]);
            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(this.map);
            this.superAndMarketMarkerArr[this.superAndMarketMarkerArr.length]=marker;
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

