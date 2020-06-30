import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter);

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
    path: '/setting',
    name: 'setting',
    component: ()=>import('../views/Setting.vue'),
    meta: {
      openTabbar:true
    }
  },
  {
    path: '*',
    name: 'page404',
    component: ()=>import('../views/_Error.vue'),
    meta: {
      openTabbar:true
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes,
  
})
router.beforeEach((to,from,next) => {
  console.log(to);
  if(store.getters.apptoken) {
    next()
  }else{
    if( to.path == '/login'){
      next()
    }else{
      // if(process.env.NODE_ENV == 'development'){
      //   next();
      // }else{
        // next('/login');
      // }
      next();
    }
  }
})
export default router
