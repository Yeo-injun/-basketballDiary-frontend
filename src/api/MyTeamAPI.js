import axios from '@/http/CustomAxios.js';
// import ImageClient from '@/http/ImageClient';

const axiosService = axios.createAxiosInstance('/myTeams');

// http get 요청에 query string 추가하는 방법 : https://axios-http.com/docs/req_config
/**
 * axios.get('url',config[]) : config 스팩 속정중 messge 정의
 */
export default {
	/**
	 * seongju
	 */
	/* API014 : 소속팀 목록 조회 */
	getMyTeams(messge) {
		return axiosService.get('', {
			params: {
				pageNo: messge.pageNo,
			},
		});
	},
	/* API012 소속팀 개인프로필 수정 */
	modifyMyTeamsProfile(messge) {
		return axiosService.postWithMultipart(`/${messge.teamSeq}/profile`, messge);
	},
	/**
	 * changgi
	 */
	/* API011 소속팀 개인프로필 조회 */
	async findMyTeamsProfile(teamSeq) {
		const { data } = await axiosService.get(`/${teamSeq}/profile`);
		return data;
	},
	/* API001 : 소속팀 운영진 조회 */
	getManagers(teamSeq) {
		return axiosService.get(`/${teamSeq}/managers`);
	},
	/* API002 : 소속팀 팀원목록 조회 */
	getTeamMembers(path, query) {
		return axiosService.get(`/${path.teamSeq}/members`, {
			params: {
				pageNo: query.pageNo,
			},
		});
	},
	/* API016 : 소속팀 정보 단건 조회 */
	async getTeamInfo(teamSeq) {
		const { data } = await axiosService.get(`/${teamSeq}/info`);
		return data;
	},
	/* API017 : 소속팀 정보 수정 */
	// TODO 제거 예정 메소드
	modifyMyTeam(teamSeq, teamInfo) {
		return axiosService.postWithMultipart(`/${teamSeq}/info`, teamInfo);
	},
	modifyMyTeamInfo(teamSeq, teamInfo, teamLogo) {
		/**
		 * Spring에서는 teamInfo와 teamLogo를 각각 @RequestPart 어노테이션으로 받음
		 * teamInfo는 JSON Type으로, teamLogo는 Multipart/image타입으로 Request를 받아서 처리
		 */
		return axiosService.postWithMultipart(`/${teamSeq}/info`, {
			teamInfo: teamInfo,
			teamLogo: teamLogo,
		});
	},
	/**
	 * injun
	 */
	/* API005 : 소속팀의 초대한 선수목록 조회 */
	searchInvitedPlayer(teamSeq, inviteState) {
		// TODO 왜 2번째 인자를 {}로 감싸야만 하는지 확인 -> 2번째 파라미터 자체가 객체여야 하고, 쿼리스트링으로 사용하기 위해서는 params속성의 값이 쿼리스트링이 됨
		return axiosService.get(`/${teamSeq}/joinRequestsTo`, {
			params: { state: inviteState },
		});
	},
	/* API007 : 소속팀의 선수초대 */
	inviteTeamMember(messge) {
		return axiosService.post(
			`/${messge.teamSeq}/joinRequestTo/${messge.userSeq}`
		);
	},
	/* API008 : 소속팀이 받은 가입요청목록 조회 */
	searchJoinRequestPlayer(messge) {
		return axiosService.get(`/${messge.teamSeq}/joinRequestsFrom`, {
			params: { state: messge.state },
		});
	},
	/* API009 : 소속팀이 사용자의 가입요청 승인 */
	approveJoinRequest(messge) {
		return axiosService.patch(
			`/${messge.teamSeq}/joinRequestFrom/${messge.teamJoinRequestSeq}/approval`
		);
	},
	/* API010 : 소속팀의 가입요청 거절 */
	rejectJoinRequest(messge) {
		return axiosService.patch(
			`/${messge.teamSeq}/joinRequestFrom/${messge.teamJoinRequestSeq}/rejection`
		);
	},
	/* API003 : 소속팀 관리자임명 */
	appointManager(messge) {
		return axiosService.patch(
			`/${messge.teamSeq}/members/${messge.teamMemberSeq}/manager`
		);
	},
	/* API015 : 소속팀 관리자 제명 */
	dismissManager(messge) {
		return axiosService.delete(
			`/${messge.teamSeq}/members/${messge.teamMemberSeq}/manager`
		);
	},
	/* API004 : 소속팀 회원 강퇴시키기 */
	dischargeTeamMember(messge) {
		return axiosService.delete(
			`/${messge.teamSeq}/members/${messge.teamMemberSeq}`
		);
	},
	/* API052 : 소속팀 게임목록조회 */
	searchMyTeamGames(path, query) {
		return axiosService.get(`/${path.teamSeq}/games`, {
			params: {
				pageNo: query.pageNo,
				// TODO 검색조건 추가
			},
		});
	},
	/* API036 : 소속팀 전체 팀원 검색 */
	searchAllTeamMembers(messge) {
		return axiosService.get(`/${messge.teamSeq}/allTeamMembers`, {
			params: {
				pageNo: messge.pageNo,
				playerName: messge.playerName,
			},
		});
	},
};
