<template>
    <swiper
    :slides-per-view="1.2"
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>

  </swiper>
    <kakao-map></kakao-map>
</template>

<script>
import KakaoMap from './KakaoMap.vue';
// Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';
export default {
  components: { KakaoMap,Swiper,SwiperSlide, },
  name: 'HelloWorld',
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
}
</script>

