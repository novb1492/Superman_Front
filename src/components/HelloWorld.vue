<template>
  <span v-if="searchDataArr!=null">
     <swiper
    :slides-per-view="1.2"
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  > 
  <swiper-slide v-for="(searchData,index) in searchDataArr.setSearchData" :key="index">
  <div @mouseover="moveXy(searchData.x,searchData.y)">{{searchData.place_name}}</div>
  </swiper-slide>
  </swiper>
  </span>
  <kakao-map ref="kmap"></kakao-map>
    
</template>

<script>
import KakaoMap from './KakaoMap.vue';
// Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';
import { mapGetters } from 'vuex';
export default {
  components: { KakaoMap,Swiper,SwiperSlide, },
  name: 'HelloWorld',
  computed: {
    ...mapGetters({
      searchDataArr: 'getSearchData',
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
  methods:{
    moveXy(x,y){
      this.$refs.kmap.changeFocus(x,y);
    }
  }
}
</script>

