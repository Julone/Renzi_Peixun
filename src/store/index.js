import Vue from 'vue'
import Vuex from 'vuex'
import home from './module/home';
import login from './module/login';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    test: 'test'
  },
  mutations: {
    SET_TEST(state, value){
      state.test = value
    }
  },
  actions: {
    SET_TEST_ACTION({commit,dispatch,getters,state}, payload){
      console.log('arguments: ' + payload);
      commit('SET_TEST', 'new Test');
    }
  },
  getters: {
    test(){
      return 1
    },
    apptoken(state){
      console.log(state);
      return state.login.apptoken
    }
  },
  modules: {
    home,
    login
  }
})
