import axios from '../http/CustomAxios.js';

// API설정 공통화
const axiosService = axios.createAxiosInstance('/user');

export default {
	getAuthInfo() {
		return axiosService.get('');
	},
	login(params) {
		return axiosService.post('/login', params);
	},
	logout() {
		return axiosService.post('/logout');
	},
	createUser(params) {
		return axiosService.post(
			'/registration',
			params,
			axios.getFileUploadConfing()
		);
	},
	checkDuplicateUserId(params) {
		return axiosService.post('/duplicationCheck', params);
	},
};
