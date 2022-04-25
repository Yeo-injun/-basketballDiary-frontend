import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
/** @ 표시는 경로 alias. 
 * jsconfig.json파일에서 설정 가능.
 * 기본갑은 ../src/*
 */
import router from '@/router/index.js';

Vue.config.productionTip = false

new Vue({
  vuetify,
  router, // router등록
  render: h => h(App)
}).$mount('#app')
