import axios from '../http/CustomAxios.js';

// API설정 공통화
const axiosService = axios.createAxiosInstance('/user');

export default {
	getAuthInfo() {
		return axiosService.get('');
	},
	login(messge) {
		return axiosService.post('/login', messge);
	},
	logout() {
		return axiosService.post('/logout');
	},
	createUser(messge) {
		return axiosService.postWithMultipart('/registration', messge);
	},
	checkDuplicateUserId(messge) {
		return axiosService.post('/duplicationCheck', messge);
	},
};
