import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
/**-------------------------------
 * @ 표시는 경로 alias.
 * jsconfig.json파일에서 설정 가능.
 * 기본값은 ../src/*
 *--------------------------------*/
import router from '@/router/index.js';
/**-------------------------------
 * Vue touch event 설치시 메세지
npm i -S vue2-touch-events

added 1 package, and audited 970 packages in 15s

99 packages are looking for funding
  run `npm fund` for details

14 vulnerabilities (9 moderate, 4 high, 1 critical)

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details
 *-------------------------------*/
import Vue2TouchEvents from 'vue2-touch-events'; // https://www.npmjs.com/package/vue2-touch-events

Vue.config.productionTip = false;

// 22.05.25(수) 작업목표
// Vuex : 상태관리를 통해 모든 컴포넌트에서 접근 가능하게끔 작업 : https://jess2.xyz/vue/vue-tip/

new Vue({
	vuetify,
	router, // router등록
	Vue2TouchEvents, // touch이벤트 플러그인 등록 ( 23.10.06 인준 추가 )
	render: (h) => h(App),
}).$mount('#app');
