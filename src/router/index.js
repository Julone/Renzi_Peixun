import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import vm from './../main.js'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      keepAlive:true,
      openTabbar:true
    }
  },
  {
    path: '/video/:k_id',
    name: 'videoByCourseId',
    component: () => import('../views/Video.vue'),
    props: true
  },
  {
    path: '/video/:k_id/:c_id/:v_id',
    name: 'videoByVideoId',
    component: () => import('../views/Video.vue'),
    props: true
  },
  {
    path: '/test/:paper_id',
    name: 'test_page',
    component: ()=>import('../views/Test.vue'),
    props: true
  },
  {
    path: '/progress',
    name: 'progress',
    component: ()=>import('../views/Progress.vue'),
    meta: {
      openTabbar:true
    }
  },
  {
    path: '/score',
    name: 'score',
    component: ()=>import('../views/Score.vue'),
    meta: {
      openTabbar:true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: ()=>import('../views/Login.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: ()=>import('../views/Search.vue'),
  },
  {
    path: '/setting',
    name: 'setting',
    component: ()=>import('../views/Setting.vue'),
    meta: {
      openTabbar:true
    }
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: ()=>import('../views/Feedback.vue')
  },
  {
    path: '*',
    name: 'page404',
    component: ()=>import('../views/_Error.vue')
  }
]

const router = new VueRouter({
  mode: process.env.VUE_APP_ROUTER_MODE,
  routes
})
router.beforeEach((to,from,next) => {
  // if (to.name !== 'login' && !store.getters.apptoken) next({ name: 'login' })
  // else next()
  next();
})
router.afterEach((to, from) => {
  if( !to.meta.savedPosition ) {
    vm.$eventBus.$emit('triggerScroll', { x: 0,y: 0 }, true)
  }
})
export default router
