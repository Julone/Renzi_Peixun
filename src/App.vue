<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <transition name="van-fade" mode="out-in" >
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <van-tabbar safe-area-inset-bottom v-if="$route.meta.openTabbar"  placeholder route v-model="activeTabbar" >
      <van-tabbar-item name="/" :to="{path:'/'}" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item name="/1" :to="{path:'/study_progress'}" icon="underway-o">进度</van-tabbar-item>
      <van-tabbar-item name="/2" :to="{path:'/score'}" icon="award-o">成绩</van-tabbar-item>
      <van-tabbar-item name="/3" :to="{path:'/c'}" icon="setting-o">标签4</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data(){
    return {
      activeTabbar: ''
    }
  },
  methods:{
    triggerScroll({x:left = 0 ,y:top = 0 }, smooth){
      this.$root.$el.scrollTo({
        top,
        left,
        behavior: smooth? 'smooth':'auto'
      })
    }
  },
  mounted(){
    this.$eventBus.$on('triggerScroll',this.triggerScroll )
  }
}
</script>

<style lang="less">
@import url('./App.less');
*{
  // border: 1px solid red;
  // box-sizing: border-box;
}
body{
    // padding-bottom: constant(safe-area-inset-bottom);
  // padding-bottom: env(safe-area-inset-bottom);
  width: 100vw;
  // background: red;
  height: 100%;

}
#app{
  // width: 100%;
  max-width: 360px;
  margin: 0 auto;
  // overflow: hidden;
  .wh100;
      touch-action: manipulation;
  height: 100vh;
    -webkit-font-smoothing: antialiased;
  overflow-y: auto;
  overflow-x: hidden;
  // padding-bottom: constant(safe-area-inset-bottom);
  /* 兼容 iOS < 11.2 */
  // padding-bottom: env(safe-area-inset-bottom);

  /* 兼容 iOS >= 11.2 */
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
</style>
