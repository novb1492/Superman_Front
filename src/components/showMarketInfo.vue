<template>
<br>
 <swiper
    :slides-per-view="1.2"
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  > 
 

<swiper-slide v-for="(item,index) in arr " :key="item">
{{index}}
</swiper-slide>

  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
export default {
  name: 'showMarketInfo',
  components: { Swiper,SwiperSlide, },
  props:['arr'],
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
  },
  methods:{

    
  }   
}
</script>


