<template>
    {{arr}}
  <input type="button" value="change" @click="change">
</template>

<script>
import { mapGetters } from 'vuex'
export default {
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

