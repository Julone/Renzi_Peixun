import Vue from 'vue'
import Vuex from 'vuex'
import home from './module/home';
import login from './module/login';
import setting from './module/setting'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home,
    login,
    setting
  }
})
