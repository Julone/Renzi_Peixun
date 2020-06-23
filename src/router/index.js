import Vue from 'vue'
import VueRouter from 'vue-router'
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
        path: '/video/:v_id',
        name: 'video',
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
        path: '/study_progress',
        name: 'study_progress',
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

export default router
