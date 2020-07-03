import {login_requestToken,login_getToken} from 'api';
import {Notify, Dialog, Toast} from 'vant';
import {setStorage,getStorage} from './../../utils/storage';
import router from '@/router'
export default {
    state: {
        apptoken: getStorage({name: 'apptoken'}) || ''
    },
    mutations:{
        login_set_apptoken(state, val){
            state.apptoken = val;
            setStorage({name: 'apptoken', content: val ,type: 'local'})
        }
    },
    actions:{
        login_getToken({commit}, val) {
            return new Promise((resolve,reject) => {
                if(process.env.NODE_ENV == 'development'){
                    login_getToken().then(r=>{
                        commit('login_set_apptoken', r.data);
                        Toast.success('获取Token成功!');
                        resolve(true)
                    }).catch(e=> reject(false))
                }else{
                    window.location.href= `./login2.aspx?gotourl=${location.href}`;
                    return resolve(true)
                }
            })
         
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