import Vue from 'vue';

/** 전역상태관리 Vue2 Observable기초 개념 : https://danielkelly.io/blog/state-management-with-vue-observable/ */
const store = Vue.observable({
	isLogin: false,
	authUserInfo: {},
});

export default {
	getters: {
		isLogin() {
			return store.isLogin;
		},
		authUserInfo() {
			return store.authUserInfo;
		},
	},
	mutations: {
		// 새로고침시 권한 정보를 업데이트 하기 위한 메소드
		init( authInfo ) {
			store.authUserInfo 	= buildUserAuth( authInfo );
			store.isLogin 		= authInfo.loginState;
		},
		// 로그인시 권한정보 세팅
		processLogin(authInfo) {
			store.authUserInfo 	= buildUserAuth( authInfo );
			store.isLogin 		= true;
		},
		// 로그아웃시 권한정보 날리기
		processLogout() {
			store.authUserInfo = {};
			store.isLogin = false;
		},
	},
};


function buildUserAuth( authInfo ) {
	return {
		userSeq		: authInfo.userSeq,
		userId		: authInfo.userId,
		authTeams	: authInfo.authTeams,
		authGames	: authInfo.authGames,
	}
}