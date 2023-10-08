<template>
	<v-container>
		<div>
			<h2>안녕하세요. 농구일기입니다. 우리팀의 경기를 기록해보세요.</h2>
		</div>
		<div v-if="isLogin">
			<h1>환영합니다. {{ loginUserInfo.userId }}님</h1>
		</div>
		<EventTestComp />
	</v-container>
</template>

<script>
	import AuthUtil from '@/common/AuthUtil.js';
	import EventTestComp from '@/components/EventTestComp.vue';

	export default {
		components: {
			EventTestComp,
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
