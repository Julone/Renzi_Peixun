<template>
  <div id="app" :style="{height:appHeight + 'px'}">
    <keep-alive>
      <router-view :key="refreshToken" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <transition name="fadeApp" mode="out-in" >
      <router-view :key="refreshToken" v-if="!$route.meta.keepAlive"></router-view>
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
import {mapGetters} from 'vuex';
export default {
  data(){
    return {
      activeTabbar: '',
      refreshToken: +new Date()
    }
  },
  computed:{
    ...mapGetters(['appHeight','htmlFontSize'])
  },
  methods:{
    triggerScroll({x:left,y:top } = {x: 0, y: 0}, smooth){
      console.log('triggerScroll');
      this.$root.$el.scrollTo({ top, left, behavior: smooth? 'smooth':'auto' })
    },
    refreshView(timeout = 0){
      console.log('refreshView', timeout);
      setTimeout(() =>{
        this.refreshToken = +new Date()
      }, timeout)
    },
    resetAppParams(){
      this.$store.dispatch('app_calibrate_time');
      this.$store.dispatch('checkDebugMode')
      this.$store.commit('set_appHeight',window.innerHeight );
    }
  },
  mounted(){
    this.$eventBus.$on('triggerScroll', this.triggerScroll);
    this.$eventBus.$on('refreshView', this.refreshView);
    window.addEventListener('load',this.resetAppParams);
    window.addEventListener('resize',this.resetAppParams);
  }
}
</script>

<style lang="less">
@import url('./App.less');
*{
  margin: 0;
  padding: 0;
}
body{
  overflow: hidden;
  @media(orientation:landscape){
    // background: red;
    padding-left: constant(safe-area-inset-left);
    padding-left: env(safe-area-inset-left);
    padding-right: constant(safe-area-inset-right);
    padding-right: env(safe-area-inset-right);
  }
}
#app{
  width: 100%;
  margin: 0 auto;
  touch-action: manipulation;
  -webkit-font-smoothing: antialiased;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-tap-highlight-color: transparent;
  &>div.MODULE{
    height: auto;
    min-height: calc(100% - 50px);
    padding: 5px 10px 0 !important;
    margin: 0 auto;
    box-sizing: border-box;
    .van-pull-refresh{
        min-height: calc(100vmax - 60px);
    }
  }
}

</style>
