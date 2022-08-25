import storageUtil from "./StorageUtil";
const UNAUTH_USER = "0";
const NOT_TEAM_MEMBER = "0";
const TEAM_MEMBER = "1";
const MANAGER = "2";
const LEADER = "3";

export default {
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
    const userSession = storageUtil.getAuthUserFromSession();
    if (userSession == null) {
      return UNAUTH_USER;
    }

    const teamAuths = userSession.userAuth;
    // builtin 메소드의 호출을 지양하는 이유 : https://ryusm.tistory.com/123
    if (Object.prototype.hasOwnProperty.call(teamAuths, teamSeq)) {
      return teamAuths[teamSeq];
    }
    return NOT_TEAM_MEMBER;
  },
};
