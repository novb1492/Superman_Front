<template>
    <kakao-map></kakao-map>
    {{arr}}
  <input type="button" value="change" @click="change">
</template>

<script>
import { mapGetters } from 'vuex'
import KakaoMap from './KakaoMap.vue';
export default {
  components: { KakaoMap },
  name: 'HelloWorld',
   computed: {
        ...mapGetters({
            arr: 'getArr'
        })
    },
    methods:{
      change(){
        this.$store.dispatch('callApi');
      }
    },
}
</script>

