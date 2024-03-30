import axios from '@/http/CustomAxios.js';

// API설정 공통화
const axiosService = axios.createAxiosInstance('/users');

export default {
	searchUsersExcludingTeamMember(pathVar, queryString) {
		return axiosService.get(`/exclusion/team/${pathVar.teamSeq}`, queryString);
	},
	/**
	 * 23.10.14 인준 설계 의도
	 * - API 객체를 호출 할시 호출부에서는 API로 부터 ResponseBody만 제어하도록 구현하기
	 * - API객체 외부에서는 Body 데이터에만 집중할 수 있도록 구현하는 것이 목표
	 * - API호출후 Response Header에 따라서 별도의 처리로직은 API객체 내부에서 처리
	 */
	async checkUserIdAvailable( message ) {
		const { data } = await axiosService.get('/available', {
			params: {
				userId : message.userId,
			},
		});
		return data;
	},
	/**
	 * 회원가입
	 */
	signUp( message ) {
		return axiosService.post('/signUp', message);
	},
};
