<template>
	<!-- https://vuetifyjs.com/en/components/application/#default-application-markup -->
	<!-- v-app태그가 vuetify의 기본 골격됨. 도화지 역할 -->
	<v-app>
		<AppNavbar />
		<v-main>
			<!-- v-main 하위의 컴포넌트는 라우팅에 따라서 다른 컴포넌트 보여주기 : Tap 영역 컴포넌트 추가 -->
			<!-- 'v-on:커스텀 이벤트명="이벤트에 매핑할 함수명"' >> 커스텀 이벤트명이 발생하게 되면 해당 이벤트에 매핑된 함수가 실행된다. -->
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
	import AppNavbar from './components/AppNavbar';

	import AuthAPI from './api/AuthAPI';

	import ValidationUtil from '@/common/util/ValidationUtil.js';
	import AuthUtil from '@/common/AuthUtil.js';

	export default {
		name: 'App',

		components: {
			AppNavbar,
		},

		data: () => {
			return {
				/**
				 * 로그인 정보는 모든 컴포넌트에서 접근 가능해야 함.
				 * 따라서 최상위 컴포넌트에서 로그인 정보를 관리할 수 있는 변수를 생성.
				 * 해당 변수를 하위컴포넌트에 props로 내려주기
				 * 22.09.22부 로그인상태관리는 LoginStateManager에서 관리
				 **/
				// javascript의 한계 : 객체 변경감지가 제한적  -참고자료 : https://uxgjs.tistory.com/193
			};
		},
		methods: {
			/** http://v3.ko.vuejs.org/guide/data-methods.html#data-%E1%84%89%E1%85%A9%E1%86%A8%E1%84%89%E1%85%A5%E1%86%BC
			 * Vue는 methods 안에서 컴포넌트 인스턴스를 항상 참조할 수 있도록 this 값을 자동으로 바인딩합니다.
			 * 이렇게 하면 메서드가 이벤트 리스너나 콜백으로 사용될 때, 올바른 this 값을 유지하게 됩니다.
			 * 화살표 함수를 사용해서 methods를 정의하면 Vue가 적절한 this 값을 바인딩하지 못합니다. 따라서 methods를 정의할 때, 화살표 함수를 사용하지 않도록 합니다.
			 */
			async checkSessionState() {
				const res = await AuthAPI.getAuthInfo();
				const authInfo = res.data;
				if (ValidationUtil.isNull(authInfo)) {
					return;
				}
				AuthUtil.setAuthInfo(authInfo);
			},
		},
		mounted() {
			// index.html이 로드되면 처음으로 호출되는 메소드로 추측됨 ( 실제 확인 필요. )
			// 따라서 서버로부터 session 정보를 받아와 Vue 전역 상태관리 객체에 데이터 재할당
			// 이를 통해
			this.checkSessionState();
		},
	};
</script>

<style>
	/** 라우터 등록시 발생하는 밑줄 제거를 위한 css설정
   * https://devbirdfeet.tistory.com/147  */
	a {
		text-decoration: none;
	}
</style>
