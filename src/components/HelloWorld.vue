<template>
     <swiper
    :slides-per-view="1.2"
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  > 
 

  <swiper-slide v-for="item  in searchDataArr" :key="item">
  <div @mouseover="moveXy(item)">123</div>
  </swiper-slide>
  </swiper>
  <kakao-map ref="kmap" :height="kmapHeight" :width="kmapWidth" :resizeWidth="resizeWidth" :resizeHeight="resizeHeight"></kakao-map>
    
</template>

<script>
import KakaoMap from './KakaoMap.vue';
// Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';
import { mapGetters } from 'vuex';
import { toRaw } from '@vue/reactivity';
export default {
  components: { KakaoMap,Swiper,SwiperSlide, },
  name: 'HelloWorld',
  data() {
    return {
      kmapWidth:window.innerWidth,
      kmapHeight:window.innerHeight,
      resizeWidth:window.innerWidth,
      resizeHeight:window.innerHeight,
    }
  },
  computed: {
    ...mapGetters({
      searchDataArr: 'getSearchData',
       map: 'getMap',
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
      var latlng=this.map.getCenter();
      var b=this.searchMarket;
      this.$store.dispatch('xyToAddress',{latlng: latlng,m:b});//좌표=>주소
    });
  },
  methods:{
    moveXy(item){
      console.log(item.setSearchData[0]);
      this.$refs.kmap.changeFocus(item.setSearchData[0]);
    },
    searchMarket(result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        //키워드로 검색 ex) 서울 동작구 마트
        var address=result[0].address;
        var keywords=[address.region_1depth_name+' '+address.region_2depth_name+' '+address.region_3depth_name+' 슈퍼마켓',address.region_1depth_name+' '+address.region_2depth_name+' '+address.region_3depth_name+' 마트',address.region_1depth_name+' '+address.region_2depth_name+' '+address.region_3depth_name+' 슈퍼'];
        this.$store.dispatch('clearSearchDataArr');//기존 마커들 지우기
        this.$store.dispatch('clearSuperAndMarketMarkerArr',this.superAndMarketMarkerArr);//기존 마커들 지우기
        this.$store.dispatch('searchForAddress',{keywordArr: keywords,callback:this.setAllData});//키워드 검색
        this.drawMarker(this.searchDataArr);
        return;
      }   
    },
    setAllData(data, status, pagination){
      if(status === window.kakao.maps.services.Status.OK){
        this.$store.dispatch('setSearchData',{setSearchData: data});//상위 컴포넌트 사용위해 저장
        if(pagination.hasNextPage){
          pagination.nextPage();
        }
      }
    },
    drawMarker(data){
      var rawObjectOrArray = toRaw(data);
      console.log(rawObjectOrArray);
        for(var i in rawObjectOrArray){
          console.log(rawObjectOrArray[i]);
           /* var marker = this.setMarker(data[i]);
            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(this.map);
            this.superAndMarketMarkerArr[this.superAndMarketMarkerArr.length]=marker;*/
        }
    },
  }
}
</script>

