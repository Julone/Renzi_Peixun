import Vue from 'vue'
import VueRouter from 'vue-router'
import Container from '@/App.container.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Container,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/About.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
