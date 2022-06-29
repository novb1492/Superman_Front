<template>
    <div id="map" style="width:500px;height:400px;"></div>
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
    values.container=document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    values.options= { //지도를 생성할 때 필요한 기본 옵션
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 3 //지도의 레벨(확대, 축소 정도)
    };
    this.$store.dispatch('init',values); //지도 생성
  },   
}
</script>

