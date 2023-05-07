import axios from '../common/CustomAxios';

// API설정 공통화
const axiosService = axios.createAxiosInstance('/users');

export default {
	findUserInfo(params) {
		return axiosService.get('', { params });
	},
};
