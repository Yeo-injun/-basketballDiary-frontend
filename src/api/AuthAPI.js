import axios from '@/http/CustomAxios.js';

// API설정 공통화
const axiosService = axios.createAxiosInstance('/auth');

export default {
	async getAuthInfo() {
		const { data } = await axiosService.get(''); 
		return data;
	},
	login(messge) {
		return axiosService.post('/login', messge);
	},
	logout() {
		return axiosService.post('/logout');
	},
};
