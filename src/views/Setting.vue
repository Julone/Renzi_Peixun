<template>
  <div class="SETTING-PAGE MODULE">
    <h1>设置中心</h1>
    <main>
      <van-cell title="注销登录" is-link @click="$store.dispatch('login_logout')">
      </van-cell>
    </main>
  </div>
</template>
<script>
export default {
  methods: {
    
  }
}
</script>
<style lang="less">
  .SETTING-PAGE{
        padding: 5px 10px 0;
    // box-sizing: border-box;
    // width: 94%;
    // margin: 0 auto;
  }
</style>