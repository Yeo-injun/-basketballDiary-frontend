<template>
	<v-container>
		<div>
			<h2>안녕하세요. 농구일기입니다. 우리팀의 경기를 기록해보세요.</h2>
		</div>
		<div v-if="isLogin">
			<h1>환영합니다. {{ loginUserInfo.userId }}님</h1>
		</div>
		<!-- 테스트 영역 -->
		<ComponentTest />
	</v-container>
</template>

<script>
	import ComponentTest from '@/views/test/ComponentTestPage.vue';
	import AuthManager from '@/common/auth/AuthManager.js';

	console.log( "[AppMain.vue] LifeCyle테스트 :: <script>" );
	console.log( this );
	console.log( "===================================" );
	export default {
		/**
		 * Vue Life Cycle 테스트 : Hook 호출 테스트
		 */
		 beforeCreate() {
			console.log( "[AppMain.vue] LifeCyle테스트 :: beforeCreate()" );
			console.log( this );
			console.log( "===================================" );
		},
		created() {
			console.log( "[AppMain.vue] LifeCyle테스트 :: created()" );
			console.log( this );
			console.log( "===================================" );
		},
		beforeMount() {
			console.log( "[AppMain.vue] LifeCyle테스트 :: beforeMount()" );
			console.log( this );
			console.log( "===================================" );
		},
		mounted() {
			console.log( "[AppMain.vue] LifeCyle테스트 :: mounted()" );
			console.log( this );
			console.log( "===================================" );
		},
		components: {
			ComponentTest,
		},
		computed: {
			isLogin() {
				return AuthManager.isLogin();
			},
			loginUserInfo() {
				return AuthManager.getUserInfo();
			},
		},
	};
</script>
