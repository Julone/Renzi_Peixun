import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './components/_index'
import './utils/flexible.js'
import './vant.js'
Vue.prototype.$eventBus = new Vue();

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
