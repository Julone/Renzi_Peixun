<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  mounted(){
    this.$toast('sd');
    this.$dialog.alert({
      title:'df'
    })
    fetch('/api/account/getAccountData',{
      method:'post'
    })
  }
}
</script>

<style lang="less">
@import url('./App.less');
#app{
  .flex();
}
</style>
