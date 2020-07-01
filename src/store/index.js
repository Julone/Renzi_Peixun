import Vue from 'vue'
import Vuex from 'vuex'
import home from './module/home';
import login from './module/login';
import setting from './module/setting'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appHeight: 0,
    htmlFontSize: 0
  },
  mutations: {
    set_appHeight(state, appHeight){
      state.appHeight = appHeight;
    },
    set_htmlFontSize(state, htmlFontSize){
      state.htmlFontSize = htmlFontSize;
    }
  },
  getters: {
    appHeight(state){
      return state.appHeight
    },
    htmlFontSize(state){
      return state.htmlFontSize
    }
  },
  modules: {
    home,
    login,
    setting
  }
})
