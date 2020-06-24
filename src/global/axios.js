import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';
import Axios from "axios";
import store from "@/store";
import { Toast } from 'vant';
var axiosIns =  Axios.create({
    timeout:10000,
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
  let token = store.getters.apptoken;
  console.log(token);
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token // token
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
var axiosByFormData = (params) => {
  var data = Object.keys(params.data).reduce((t,el) => {
    var value = params.data[el];
    if({}.toString.call(value) === '[object Object]'){
      value = JSON.stringify(value)
    }
    t.push(el + "=" + value);
    return t;
  },[]).join('&')
  var config = {
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data
  }
  return axiosIns(Object.assign(params,config))
}


export default axiosIns;
export {
  axiosByFormData
}