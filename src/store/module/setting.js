import { Notify, Dialog, Toast } from "vant";
import { setStorage, getStorage, clearStorage } from "./../../utils/storage";
import router from "@/router";
export default {
  state: {
    app_version: '20200701'
  },
  mutations: {},
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
  getters: {},
};
