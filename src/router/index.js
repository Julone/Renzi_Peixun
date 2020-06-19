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
        path: '/test',
        name: 'test_page',
        component: ()=>import('../views/Test.vue')
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
  scrollBehavior (to, from, savedPosition) {
    // console.log(savedPosition);
    // if (savedPosition) {
    //     return savedPosition
    // }   else {
    //     if (from.meta.keepAlive) {
    //       console.log(document.querySelector('.app-container').scrollTop);
    //         from.meta.savedPosition = document.body.scrollTop;
    //     }
    //     return { x: 0, y: to.meta.savedPosition || 0 }
    // }
  },

})

export default router
