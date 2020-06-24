import {login_requestToken} from 'api';
import {Notify} from 'vant';
import {setStorage,getStorage} from './../../utils/storage'
export default {
    state: {
        apptoken: getStorage({name: 'apptoken'}) || ''
    },
    mutations:{
        login_set_apptoken(state, val){
            console.log(state);
            state.apptoken = val;
            setStorage({name: 'apptoken', content: val ,type: 'session'})
        }
    },
    actions:{
        login_requestToken({commit,state}, {userName,password}){
            return login_requestToken({userName,password}).then(r=>{
                console.log(r.data.token);
                if(r.errcode == 0) {
                    commit('login_set_apptoken', r.data.token);
                    console.log(state);
                    return Promise.resolve(1)
                }else{
                   throw new Error(r.errmsg);
                }
            }).catch(e=>{
                Notify('用户登录失败!');
                return Promise.reject(-1)
                
            })
        }
    }
}