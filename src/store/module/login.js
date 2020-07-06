import {login_requestToken,login_getToken} from 'api';
import {Notify, Dialog, Toast} from 'vant';
import {setStorage,getStorage} from './../../utils/storage';
import router from '@/router';
import vm from './../../main.js'
export default {
    state: {
        apptoken: getStorage({name: 'apptoken'}) || ''
    },
    mutations:{
        login_set_apptoken(state, val){
            state.apptoken = val;
            setStorage({name: 'apptoken', content: val ,type: 'local'});
        }
    },
    actions:{
        async login_getToken({commit,state}, val) {
            function getIsWxClient () {
                var ua = navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == "micromessenger") {
                    return true;
                }
                return false;
            };
        
            if(!getIsWxClient()){
                login_getToken().then(async r=>{
                    var a = commit('login_set_apptoken', r.data);
                    Toast.success('获取Token成功!');
                    router.push('/')
                }).catch(e=> {
                    console.log(e)
                })
            }else{
                if(!state.apptoken) {
                    if(vm.$route.query.apptoken) {
                        commit('login_set_apptoken',vm.$route.query.apptoken);
                        setTimeout(()=>{
                            router.push('/')
                        },100)
                    }else{
                        window.location.href= `http://tm.lilanz.com/QYWX/project/Julone/peixun2/login2.aspx?gotourl=${location.href}`;
                    }
                }
            }
        },
        login_logout({commit, state}) {
           return Dialog.confirm({
                title: '退出登录',
                message: '确认要退出登录吗?',
                confirmButtonColor: '#f54c4c'
              }).then(() => {
                    commit('login_set_apptoken', '');
                    commit('setting_set_userInfo', {userName:'',userId: ''})
                    // router.push('/login')
              }).catch(() => {
                  return -1;
              });
        },
    },
    getters:{
        apptoken(state){
            return state.apptoken
        }
    }
}