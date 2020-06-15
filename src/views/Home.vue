<template>
  <div class="home">
    home
    <julone>2</julone>
    {{$store.state.test}}
    <button @click="SET_TEST_ACTION">mutation</button>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data(){
    return  {

    }
  },
  methods: {
    ...Vue.prototype.$mapActions([
      'SET_TEST_ACTION'
    ])

  },
  mounted(){
    console.log(this.$mapActions);
    console.log(this.$store.getters.test);


  }
}
</script>
