import Vue from 'vue'
import Vuex from 'vuex'
import home from './module/home';
import login from './module/login';
import setting from './module/setting';
import {app_getServerTime} from 'api';
import router from './../router';
import {getStorage,setStorage} from './../utils/storage';
import {addScript} from './../utils/utils';

import vm from './../main.js';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appHeight: 0,
    htmlFontSize: 0,
    appTimeCalibration: 0,
    debugMode: getStorage({name: 'debugMode'}) ||false
  },
  mutations: {
    set_appHeight(state, appHeight){
      state.appHeight = appHeight;
    },
    set_htmlFontSize(state, htmlFontSize){
      state.htmlFontSize = htmlFontSize;
    },
    set_appTimeCalibration(state, serverTime){
      state.appTimeCalibration = serverTime - Date.now();
    },
    set_debugMode(state,debugMode){
      state.debugMode= debugMode;
      setStorage({name: 'debugMode',type: 'session', content: debugMode});
    }
  },
  actions: {
    app_calibrate_time({commit},val){
      app_getServerTime().then(r=>{
        r.errcode == 0 && commit('set_appTimeCalibration',r.data)
      })
    },
    app_go_back(){
      router.go(-1)
    },
    checkDebugMode({commit, state}){
      function callback() { 
        addScript('https://cdn.bootcdn.net/ajax/libs/vConsole/3.3.4/vconsole.min.js', () => {
            window.VConsole && new window.VConsole();
        })
      }
      if( state.debugMode ){
        callback()
      }else{
        setTimeout(()=>{
          if(vm.$route.query && vm.$route.query.hasOwnProperty('debug')){
            console.log('vConsole Start');
            commit('set_debugMode', true)
            callback();
          };
        },500);
      }
    }

  },
  getters: {
    appHeight(state){
      return state.appHeight
    },
    htmlFontSize(state){
      return state.htmlFontSize
    },
    appStandardTime: (state) => () => {
      return Date.now() + state.appTimeCalibration
    }
  },
  modules: {
    home,
    login,
    setting
  }
})
