<template>
  <div id="app" :style="{height:appHeight + 'px'}">
    <keep-alive>
      <router-view  v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <transition name="van-fade" mode="out-in" >
      <router-view :key="refreshToken" :appHeight="appHeight" v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <van-tabbar safe-area-inset-bottom v-if="$route.meta.openTabbar"  placeholder route v-model="activeTabbar" >
      <van-tabbar-item :to="{path:'/'}" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item :to="{path:'/progress'}" icon="underway-o">进度</van-tabbar-item>
      <van-tabbar-item :to="{path:'/score'}" icon="award-o">成绩</van-tabbar-item>
      <van-tabbar-item :to="{path:'/setting'}" icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>

export default {
  data(){
    return {
      activeTabbar: '',
      appHeight: 0,
      refreshToken: +new Date()
    }
  },
  methods:{
    triggerScroll({x:left,y:top } = {x: 0, y: 0}, smooth){
      console.log('triggerScroll');
      this.$root.$el.scrollTo({ top, left, behavior: smooth? 'smooth':'auto' })
    },
    refreshView(){
      this.refreshToken = +new Date()
    },
    getAppHeight(){
      console.log('app height');
      this.appHeight = window.innerHeight;
    }
  },
  mounted(){
    this.$eventBus.$on('triggerScroll', this.triggerScroll);
    this.$eventBus.$on('refreshView', this.refreshView);
    window.addEventListener('load',this.getAppHeight);
    window.addEventListener('resize',this.getAppHeight);
  }
}
</script>

<style lang="less">
@import url('./App.less');

*{
  // border: 1px solid red;
  // box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body{
    // padding-bottom: constant(safe-area-inset-bottom);
  // padding-bottom: env(safe-area-inset-bottom);
  width: 100vw;
  // background: red;
  height: 100%;
    /* 兼容 iOS >= 11.2 */
    padding-bottom: constant(safe-area-inset-bottom);
  /* 兼容 iOS < 11.2 */
  padding-bottom: env(safe-area-inset-bottom);
// -webkit-overflow-scroll: touch;
}
#app{
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
  touch-action: manipulation;
  -webkit-font-smoothing: antialiased;
  overflow-y: auto;
  overflow-x: hidden;

  -webkit-tap-highlight-color: rgba(0,0,0,0);
  &>div.MODULE{
    height: auto;
    min-height: calc(100% - 50px);
    padding: 5px 10px 0 !important;
    margin: 0 auto;
    box-sizing: border-box;
  }
}

.van-pull-refresh{
    min-height: calc(100vmax - 60px);
}
</style>
