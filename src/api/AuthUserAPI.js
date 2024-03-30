import axios from '../http/CustomAxios.js';

const axiosService = axios.createAxiosInstance('/loginUser');

export default {
	// API020 : 농구팀 가입요청 보내기
	sendJoinRequestToTeam(params) {
		return axiosService.post(`/joinRequestTo/${params.teamSeq}`);
	},
	// API022 : 농구팀 가입요청 목록 조회
	getJoinRequestsTo() {
		return axiosService.get(`/joinRequestsTo`);
	},
	// API023 : 팀 가입요청 취소
	cancelJoinReqeust(params) {
		return axiosService.delete(`/joinRequestsTo/${params.teamJoinRequestSeq}`);
	},
	// API024 : 팀 초대 승인
	approveInvitation(params) {
		return axiosService.put(
			`/joinRequestsFrom/${params.teamJoinRequestSeq}/approval`
		);
	},
	// API033 : 농구팀 초대 거절
	rejectInvitation(params) {
		return axiosService.put(
			`/joinRequestsFrom/${params.teamJoinRequestSeq}/rejection`
		);
	},
	// API032 : 농구팀 초대 목록 조회
	getJoinRequestsFrom() {
		return axiosService.get(`/joinRequestsFrom`);
	},
	getMyInfo() {
		return axiosService.get(`/profile`);
	},
	updateUser(params) {
		return axiosService.post(`/profile`, params);
	},
	// API028 : 회원탈퇴 TODO USERApi로 이전
	// cf. 일반적인 delete메소드는 Http Body를 지원하지는 않는 것이 표준 스펙. 그렇기 때문에 서버에 따라서 Delete 메소드의 Body를 지원하지 않는 경우 존재. 
	withdrawalMembership( message ) {
		return axiosService.delete('/profile',  {
			params: {
				password : message.password,
			},
		} );
	},
	updatePassword(params) {
		return axiosService.post(`/profile/password`, params);
	},
};
