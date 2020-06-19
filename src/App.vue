<template>
  <div id="app">
     
        <keep-alive>
         
              <router-view v-if="$route.meta.keepAlive"></router-view>
          
        </keep-alive>
         <transition name="van-fade" mode="out-in" >
          <router-view v-if="!$route.meta.keepAlive"></router-view>
         </transition>

    <van-tabbar v-if="$route.meta.openTabbar" route v-model="activeTabbar" placeholder>
      <van-tabbar-item name="/" :to="{path:'/'}" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item name="/1" :to="{path:'/study_progress'}" icon="search">个人进度</van-tabbar-item>
      <van-tabbar-item name="/2" :to="{path:'/b'}" icon="friends-o">标签3</van-tabbar-item>
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
    console.log(this.$root);
  }
}
</script>

<style lang="less">
@import url('./App.less');
#app{
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  overflow: hidden;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: constant(safe-area-inset-bottom);
  /* 兼容 iOS < 11.2 */
  padding-bottom: env(safe-area-inset-bottom);
  /* 兼容 iOS >= 11.2 */
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
</style>
