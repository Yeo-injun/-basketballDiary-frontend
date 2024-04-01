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
	// TODO USERAPI로 이전 예정
	updatePassword(params) {
		return axiosService.post(`/profile/password`, params);
	},
};
