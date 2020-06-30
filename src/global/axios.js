import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';
import Axios from "axios";
import store from "@/store";
import {
  Toast,
  Notify,
  Dialog
} from 'vant';
import router from '@/router'
var axiosInitialConfig = {
  timeout: 10000,
  withCredentials: true,
  validateStatus: function (status) {
    return status >= 200 && status <= 500
  }
}
var axiosIns = Axios.create(axiosInitialConfig);
NProgress.configure({
  showSpinner: false,
  speed: 800,
  trickle: true
});
// HTTPrequest拦截
axiosIns.interceptors.request.use(config => {
  NProgress.remove();
  NProgress.start() // start progress bar;

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
  if (errcode != 0 || status != 200) {
    if (errcode == 401 || errcode == 402) {
      return Dialog.confirm({
        title: '请先登录',
        message: errmsg
      }).then(r => {
        router.push('/login');
      }).catch(e => {
        router.go(-1)
      })
    }
    Toast({
      message: errmsg,
      forbidClick: true,
      duration: 1000,
      icon: 'cross'
    });
    return Promise.reject(res.data.errmsg);
  } else {
    return Promise.resolve(res.data);
  }
}, error => {
  NProgress.done();
  return Promise.reject(new Error(error))
})
var axiosByFormData = (params) => {
  let token = store.getters.apptoken;
  if(params.data && params.data.data){
    token && (params.data.data.token = token);
  }else{
    params.data = {data: {token: token}};  
  }
  var config = {
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: dataToFormdata(params.data)
  }
  return axiosIns(Object.assign(params, config))
}

function dataToFormdata(data = {}) {
  return Object.keys(data).reduce((t, el) => {
    var value = data[el];
    if ({}.toString.call(value) === '[object Object]') {
      value = JSON.stringify(value)
    }
    t.push(el + "=" + value);
    return t;
  }, [])

  .join('&')
}
var axiosSilent = Axios.create(axiosInitialConfig)
// HTTPrequest拦截
axiosSilent.interceptors.request.use(config => {
  let token = store.getters.apptoken;
  token && (config.headers['Authorization'] = 'Bearer ' + token) // token
  config.data = dataToFormdata(config.data);
  return config
}, error => {
  return Promise.reject(error)
})

// HTTPresponse拦截
axiosSilent.interceptors.response.use(res => {
  return Promise.resolve(res.data);
}, error => {
  return Promise.reject(new Error(error))
})


export default axiosIns;
export {
  axiosByFormData,
  axiosSilent
}