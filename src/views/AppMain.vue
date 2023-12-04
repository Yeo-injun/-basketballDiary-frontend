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
	import AuthUtil from '@/common/AuthUtil.js';

	export default {
		components: {
			ComponentTest,
		},
		computed: {
			isLogin() {
				return AuthUtil.isLogin();
			},
			loginUserInfo() {
				return AuthUtil.getAuthUserInfo();
			},
		},
	};
</script>
