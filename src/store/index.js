import Vue from 'vue'
import Vuex from 'vuex'
import home from './module/home'
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex';
Vue.prototype.$mapState = mapState;
Vue.prototype.$mapMutations = mapMutations;
Vue.prototype.$mapGetters = mapGetters;
Vue.prototype.$mapActions = mapActions;
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
    }
  },
  modules: {
    home
  }
})
