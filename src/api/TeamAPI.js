/* eslint-disable */
import axios from '@/http/CustomAxios.js';

const axiosService = axios.createAxiosInstance('/teams');

export default {
	/** API019 : 팀 목록 조회 */
	searchTeams(params) {
		return axiosService.get('', { params });
	},
	/** API021 : 팀 등록 */
	registerTeam(params) {
		return axiosService.postWithMultipart('', params);
	},
};
