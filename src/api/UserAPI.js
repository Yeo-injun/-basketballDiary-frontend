import axios from '../common/CustomAxios';

// API설정 공통화
const axiosService = axios.createAxiosInstance('/users');

export default {
	searchUsersExcludingTeamMember(pathVar, queryString) {
		return axiosService.get(`/exclusion/team/${pathVar.teamSeq}`, queryString);
	},
};
