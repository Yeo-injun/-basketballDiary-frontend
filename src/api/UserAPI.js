import axios from '@/http/CustomAxios.js';
import ValidationUtil from '@/common/util/ValidationUtil.js';

// API설정 공통화
const axiosService = axios.createAxiosInstance('/users');

export default {
	/**
	 * TODO 제거 예정
	 * API006 사용자 검색
	 */
	searchUsersExcludingTeamMember(pathVar, queryString) {
		return axiosService.get(`/exclusion/team/${pathVar.teamSeq}`, queryString);
	},
	/**
	 * API006 사용자 검색
	 */
	getUsersExcludingTeamMembers(pathVar, queryString) {
		return axiosService.get(
				`/excludeTeam/${pathVar.teamSeq}`, 
				{
					params : {
						userName 	: ValidationUtil.isNull( queryString.userName ) ? null : queryString.userName,
						email 		: ValidationUtil.isNull( queryString.email ) 	? null : queryString.email,
					},	
				}
			);
	},
	/**
	 * API025 회원 프로필 조회
	 */
	async getMyProfile() {
		const { data } = await axiosService.get(`/profile`);
		return data.profile;
	},
	/**
	 * API026 회원 프로필 수정
	 */
	updateMyProfile( params ) {
		return axiosService.post(`/profile`, params);
	},
	/**
	 * API027 비밀번호 변경
	 */
	updatePassword( params ) {
		return axiosService.post(`/password`, params);
	},
	/**
	 * API029 회원가입
	 */
	signUp( message ) {
		return axiosService.post('/signUp', message);
	},
	/**
	 * API028 : 회원탈퇴
	 * cf. 일반적인 delete메소드는 Http Body를 지원하지는 않는 것이 표준 스펙. 그렇기 때문에 서버에 따라서 Delete 메소드의 Body를 지원하지 않는 경우 존재. 
	 */
	withdrawalMembership( message ) {
		return axiosService.delete(
					'',  
					{
						params: {
							password : message.password,
						},
					}
				);
	},
	/**
	 * API034 사용자ID 사용가능여부 확인
	 * 23.10.14 인준 설계 의도
	 * - API 객체를 호출 할시 호출부에서는 API로 부터 ResponseBody만 제어하도록 구현하기
	 * - API객체 외부에서는 Body 데이터에만 집중할 수 있도록 구현하는 것이 목표
	 * - API호출후 Response Header에 따라서 별도의 처리로직은 API객체 내부에서 처리
	 */
	async checkUserIdAvailable( message ) {
		const { data } = await axiosService.get(
							'/available', 
							{
								params: {
									userId : message.userId,
								},
							}
						);
		return data;
	},
};
