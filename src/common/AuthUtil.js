import AuthStateManager from '@/common/state/AuthStateManager';
import ValidationUtil from '@/common/util/ValidationUtil.js';
// TODO AuthStateManager는 AuthUtil에서만 호출하게끔 수정하기

const UNAUTH_USER 		= '0';
const NOT_TEAM_MEMBER 	= '0';
const TEAM_MEMBER 		= '1';
const MANAGER 			= '2';
const LEADER 			= '3';

export default {
	login(authInfo) {
		AuthStateManager.mutations.processLogin(authInfo);
	},
	logout() {
		AuthStateManager.mutations.processLogout();
	},
	getAuthUserInfo() {
		return AuthStateManager.getters.authUserInfo();
	},
	getUserAuth() {
		// TODO 소스코드 대체하기
		return this.getAuthUserInfo().userAuth;
	},

	isLogin() {
		return AuthStateManager.getters.isLogin();
	},
	setAuthInfo(authInfo) {
		if (ValidationUtil.isNull(authInfo)) {
			return;
		}
		AuthStateManager.mutations.processLogin(authInfo);
	},
	isTeamMemeber(targetTeamSeq) {
		const targetTeamAuth = this.getTeamAuth(targetTeamSeq);
		if (targetTeamAuth >= TEAM_MEMBER) {
			return true;
		}
		return false;
	},
	isManager(targetTeamSeq) {
		const targetTeamAuth = this.getTeamAuth(targetTeamSeq);
		if (targetTeamAuth >= MANAGER) {
			return true;
		}
		return false;
	},
	isLeader(targetTeamSeq) {
		const targetTeamAuth = this.getTeamAuth(targetTeamSeq);
		if (targetTeamAuth == LEADER) {
			return true;
		}
		return false;
	},
	getTeamAuth(teamSeq) {
		const isNotLogin = !AuthStateManager.getters.isLogin();
		if (isNotLogin) {
			return UNAUTH_USER;
		}

		const authTeamMap = AuthStateManager.getters.authUserInfo().authTeams;
		// builtin 메소드의 호출을 지양하는 이유 : https://ryusm.tistory.com/123
		if ( Object.prototype.hasOwnProperty.call( authTeamMap, teamSeq ) ) {
			return authTeamMap[teamSeq];
		}
		return NOT_TEAM_MEMBER;
	},
};
