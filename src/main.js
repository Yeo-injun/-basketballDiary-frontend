import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
/**-------------------------------
 * @ 표시는 경로 alias.
 * jsconfig.json파일에서 설정 가능.
 * 기본값은 ../src/*
 *--------------------------------*/
import router from '@/router/index.js';

Vue.config.productionTip = false;

// 22.05.25(수) 작업목표
// Vuex : 상태관리를 통해 모든 컴포넌트에서 접근 가능하게끔 작업 : https://jess2.xyz/vue/vue-tip/

new Vue({
	vuetify,
	router, // router등록
	render: (h) => h(App),
}).$mount('#app');
