import AuthStateManager from '@/common/state/AuthStateManager';
// TODO AuthStateManager는 AuthUtil에서만 호출하게끔 수정하기

const UNAUTH_USER = '0';
const NOT_TEAM_MEMBER = '0';
const TEAM_MEMBER = '1';
const MANAGER = '2';
const LEADER = '3';

export default {
	// TODO 소스코드 대체하기
	login() {
		AuthStateManager.mutations.processLogin();
	},
	logout() {
		AuthStateManager.mutations.processLogout();
	},
	getAuthUserInfo() {
		return AuthStateManager.getters.authUserInfo();
	},
	getUserAuth() {
		return this.getAuthUserInfo().userAuth;
	},
	// TODO 소스코드 대체하기

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

		const teamAuths = AuthStateManager.getters.authUserInfo().userAuth;
		// builtin 메소드의 호출을 지양하는 이유 : https://ryusm.tistory.com/123
		if (Object.prototype.hasOwnProperty.call(teamAuths, teamSeq)) {
			return teamAuths[teamSeq];
		}
		return NOT_TEAM_MEMBER;
	},
};
