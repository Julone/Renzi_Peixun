import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';
import axios from "axios";
import store from "@/store";
import { Toast } from 'vant';
var axiosIns = new axios({
    timeout:6000,
    withCredentials:true,
    validateStatus: function (status) {
        return status >= 200 && status <= 500
    }
});
NProgress.configure({
  showSpinner: false,
  speed:600
});
// HTTPrequest拦截
axiosIns.interceptors.request.use(config => {
  NProgress.remove();
  let { showProgress = true} = config.headers;
  showProgress && NProgress.start() // start progress bar
  let token = store.getters.token;
  if (token) {
    config.headers['Authorization'] = token // token
  }
  return config
}, error => {
  return Promise.reject(error)
})

// HTTPresponse拦截
axiosIns.interceptors.response.use(res => {
  NProgress.done()
  const status = Number(res.status) || 200
  const errmsg = res.data.errmsg || '服务器错误，请稍候重试';
  const errcode = res.data.errcode;
  let {showError = true} = res.config.headers;
  if(errcode != 0 || status != 200){
    showError && Toast({ message: errmsg, forbidClick: true, duration:1000,  icon: 'cross'});
    return Promise.reject(res.data.errmsg);
  }else{
    return Promise.resolve(res.data);
  }
}, error => {
  NProgress.done();
  return Promise.reject(new Error(error))
})

export default axiosIns;