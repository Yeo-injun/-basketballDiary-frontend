// 컴포넌트 전역에서 관리하고자 하는 상태를 관리하기 위한 저장소
// GlobalStateStore에 등록되어 있는 변수는 모든 컴포넌트에서 접근 가능
/** Vue2에서는 vue.observable()로 반응성 관리. Vue3에서는 reactive()로 관리 */
// 공식문서 : https://vuejs.org/guide/scaling-up/state-management.html#simple-state-management-with-reactivity-api
// 참고문서 : https://velog.io/@ken1204/Vue%EC%9D%98-Reactivity-System-Vue2

// Vue2 버전의 전역상태관리 - observable() : https://ko.n4zc.com/article/web_develop/javascript/6f8wyjwy.html
import Vue from "vue";

const store = Vue.observable({
  isLoading: false,
});

// export const getters = {
//   isLoading() {
//     return store.isLoading;
//   },
// };

// export const mutations = {
//   loadingStart() {
//     store.isLoading = true;
//   },
//   loadingEnd() {
//     store.isLoading = false;
//   },
// };

export default {
  getters: {
    isLoading() {
      return store.isLoading;
    },
  },
  mutations: {
    loadingStart() {
      store.isLoading = true;
    },
    loadingEnd() {
      store.isLoading = false;
    },
  },
};
