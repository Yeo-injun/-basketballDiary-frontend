import Vue from "vue";

/** 전역상태관리 Vue2 Observable기초 개념 : https://danielkelly.io/blog/state-management-with-vue-observable/ */
const store = Vue.observable({
  isLogin: false,
  authUserInfo: {},
});

export default {
  getters: {
    isLogin() {
      return store.isLogin;
    },
    authUserInfo() {
      return store.authUserInfo;
    },
  },
  mutations: {
    processLogin(authInfo) {
      store.authUserInfo = authInfo;
      store.isLogin = true;
    },
    processLogout() {
      store.authUserInfo = {};
      store.isLogin = false;
    },
  },
};
