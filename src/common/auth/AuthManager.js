import AuthAPI from '@/api/AuthAPI';
import AuthStateManager from '@/common/state/AuthStateManager';
import ValidationUtil from '@/common/util/ValidationUtil.js';
// TODO AuthUtil을 AuthManager로 대체하기
// 

const UNAUTH_USER = '0';
const NOT_TEAM_MEMBER = '0';
const TEAM_MEMBER = '1';
const MANAGER = '2';
const LEADER = '3';

export default {
	async init() {
		const res = await AuthAPI.getAuthInfo();
		this.setAuthInfo( res.data );
	},
	setAuthInfo(authInfo) {
		if (ValidationUtil.isNull(authInfo)) {
			console.log( "[ Error ] 권한정보가 존재하지 않습니다. ");
			return;
		}
		AuthStateManager.mutations.processLogin(authInfo);
	},
	/**------------------------
	 * 권한 상태 확인 메소드 
	 **------------------------*/
	isLogin() {
		return AuthStateManager.getters.isLogin();
	},
	isTeamMemeber(targetTeamSeq) {
		const targetTeamAuth = getTeamAuth(targetTeamSeq);
		if (targetTeamAuth >= TEAM_MEMBER) {
			return true;
		}
		return false;
	},
	isManager(targetTeamSeq) {
		const targetTeamAuth = getTeamAuth(targetTeamSeq);
		if (targetTeamAuth >= MANAGER) {
			return true;
		}
		return false;
	},
	isLeader(targetTeamSeq) {
		const targetTeamAuth = getTeamAuth(targetTeamSeq);
		if (targetTeamAuth == LEADER) {
			return true;
		}
		return false;
	},
};

function getTeamAuth(teamSeq) {
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
}
