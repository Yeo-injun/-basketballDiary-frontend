import axios from "@/common/CustomAxios";
const axiosService = axios.createAxiosInstance("/myTeams");

// http get 요청에 query string 추가하는 방법 : https://axios-http.com/docs/req_config
/**
 * axios.get('url',config[]) : config 스팩 속정중 params 정의
 */
export default {
  /**
   * seongju
   */
  /* API014 : 소속팀 목록 조회 */
  searchTeams() {
    return axiosService.get();
  },
  /* API012 소속팀 개인프로필 수정 */
  modifyMyTeamsProfile(teamSeq, formData) {
    return axiosService.post(`/${teamSeq}/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  /**
   * changgi
   */
  /* API011 소속팀 개인프로필 조회 */
  findMyTeamsProfile(teamSeq) {
    console.log(`findMyTeamsProfile call : /${teamSeq}/profile`);
    return axiosService.get(`/${teamSeq}/profile`);
  },
  /* API001 : 소속팀 운영진 조회 */
  searchManagers(teamSeq) {
    console.log(`searchManagers call : /${teamSeq}/managers`);
    return axiosService.get(`/${teamSeq}/managers`);
  },
  /* API002 : 소속팀 팀원목록 조회 */
  searchMembers(teamSeq, pageNo) {
    console.log(`searchMembers call : /${teamSeq}/members/pageNo=${pageNo}`);
    return axiosService.get(`/${teamSeq}/members`, {
      params: {
        pageNo: pageNo,
      },
    });
  },
  /* API016 : 소속팀 정보 단건 조회 */
  searchTeam(teamSeq) {
    return axiosService.get(`/${teamSeq}/info`);
  },
  /* API017 : 소속팀 정보 수정 */
  modifyMyTeam(teamSeq, teamInfo) {
    return axiosService.post(`/${teamSeq}/info`, teamInfo);
  },
  /**
   * injun
   */
  /* API005 : 소속팀의 초대한 선수목록 조회 */
  searchInvitedPlayer(params) {
    // TODO 왜 2번째 인자를 {}로 감싸야만 하는지 확인 -> 2번째 파라미터 자체가 객체여야 하고, 쿼리스트링으로 사용하기 위해서는 params속성의 값이 쿼리스트링이 됨
    return axiosService.get(`/${params.teamSeq}/joinRequestsTo`, {
      params: { state: params.state },
    });
  },
  /* API007 : 소속팀의 선수초대 */
  inviteTeamMember(params) {
    return axiosService.post(
      `/${params.teamSeq}/joinRequestTo/${params.userSeq}`
    );
  },
  /* API008 : 소속팀이 받은 가입요청목록 조회 */
  searchJoinRequestPlayer(params) {
    return axiosService.get(`/${params.teamSeq}/joinRequestsFrom`, {
      params: { state: params.state },
    });
  },
  /* API009 : 소속팀이 사용자의 가입요청 승인 */
  approveJoinRequest(params) {
    return axiosService.patch(
      `/${params.teamSeq}/joinRequestFrom/${params.teamJoinRequestSeq}/approval`
    );
  },
  /* API010 : 소속팀의 가입요청 거절 */
  rejectJoinRequest(params) {
    return axiosService.patch(
      `/${params.teamSeq}/joinRequestFrom/${params.teamJoinRequestSeq}/rejection`
    );
  },
  /* API003 : 소속팀 관리자임명 */
  appointManager(params) {
    return axiosService.patch(
      `/${params.teamSeq}/members/${params.teamMemberSeq}/manager`
    );
  },
  /* API015 : 소속팀 관리자 제명 */
  dismissManager(params) {
    return axiosService.delete(
      `/${params.teamSeq}/members/${params.teamMemberSeq}/manager`
    );
  },
  /* API004 : 소속팀 회원 강퇴시키기 */
  dischargeTeamMember(params) {
    return axiosService.delete(
      `/${params.teamSeq}/members/${params.teamMemberSeq}`
    );
  },
};
