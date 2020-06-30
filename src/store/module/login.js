import {login_requestToken,login_getToken} from 'api';
import {Notify, Dialog} from 'vant';
import {setStorage,getStorage} from './../../utils/storage';
import router from '@/router'
export default {
    state: {
        apptoken: getStorage({name: 'apptoken'}) || ''
    },
    mutations:{
        login_set_apptoken(state, val){
            state.apptoken = val;
            setStorage({name: 'apptoken', content: val ,type: 'session'})
        }
    },
    actions:{
        login_requestToken({commit,state}, {userName,password}){
            return login_requestToken({userName,password}).then(r=>{
                if(r.errcode == 0) {
                    commit('login_set_apptoken', r.data.token);
        
                    return Promise.resolve(1)
                }else{
                   throw new Error(r.errmsg);
                }
            }).catch(e=>{
                Notify('用户登录失败!');
                return Promise.reject(-1)  
            })
        },
        login_getToken({commit}, val) {
            return login_getToken().then(r=>{
                commit('login_set_apptoken', r.data);
            })
        },
        login_logout({commit, state}) {
           return Dialog.confirm({
                title: '退出登录',
                message: '确认要退出登录吗?',
                confirmButtonColor: '#f54c4c'
              }).then(() => {
                    commit('login_set_apptoken', '');
                    router.push('/login')
              }).catch(() => {
                  return -1;
              });
        }
    }
}