<template>
	<v-container>
		<div>
			<h2>안녕하세요. 농구일기입니다. 우리팀의 경기를 기록해보세요.</h2>
		</div>
		<div v-if="isLogin">
			<h1>환영합니다. {{ loginUserInfo.userId }}님</h1>
		</div>
		<!-- 새로고침하면 Vue Store에서 가지고 있는 세션정보들이 날라감. 화면에서 세션상태를 유지할 수 있는 방법 고민...  -->
	</v-container>
</template>

<script>
	import AuthUtil from '@/common/AuthUtil.js';

	export default {
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
