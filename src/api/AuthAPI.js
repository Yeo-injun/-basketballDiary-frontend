import axios from '@/http/CustomAxios.js';

// API설정 공통화
const axiosService = axios.createAxiosInstance('/auth');

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
};
