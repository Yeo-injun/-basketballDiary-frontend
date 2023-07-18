<template>
	<v-container>
		<h1>{{ isLogin }}</h1>
		<div>{{ loginUserInfo }}</div>
	</v-container>
</template>

<script>
	import AuthStateManager from '@/common/state/AuthStateManager';

	export default {
		data: () => {
			return {
				isLogin: AuthStateManager.getters.isLogin(),
				loginUserInfo: {},
			};
		},
		methods: {
			getLoginUserInfo() {
				const auth = AuthStateManager.getters.authUserInfo();
				if (auth == null) {
					this.loginUserInfo = '로그인 정보가 없습니다.';
					return;
				}
				this.loginUserInfo = auth;
			},
		},
		mounted() {
			this.getLoginUserInfo();
		},
	};
</script>
