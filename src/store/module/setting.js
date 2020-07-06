import { Notify, Dialog, Toast } from "vant";
import { setStorage, getStorage, clearStorage } from "./../../utils/storage";
import router from "@/router";
export default {
  state: {
    app_version: '20200706',
    userName: '',
    userId: '',
    headImg:getStorage({name: 'headImg'}) || ""
  },
  mutations: {
    setting_set_userInfo(state, {userName,userId}){
      state.userName = userName;
      state.userId = userId;
    }
  },
  actions: {
    setting_clearCache({ commit, state }) {
      return Dialog.confirm({
        title: "清除缓存",
        message: "确认要清除缓存吗?",
      })
        .then((r) => {
          Toast.loading("正在清除中...");
          clearStorage();
          clearStorage({
            type: "session",
          });
          setTimeout(() => {
            Toast.success("清除完成");
          }, 1000);
        })
        .catch((e) => e);
    },
  },
  getters: {
    userName(state){
      return state.userName
    },
    userId(state){
      return state.userId
    },
    headImg(state){
      return state.headImg
    }
  },
};
