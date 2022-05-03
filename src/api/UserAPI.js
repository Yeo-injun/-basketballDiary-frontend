import axios from './defaultAxios';
import { SERVER_URL } from './const';

// API설정 공통화
const axiosService = axios.createDefault('/user', SERVER_URL.AWS);

export default {
    login(data) {
        return axiosService.post('/login', data);
    },
    logout() {
        return axiosService.post('/logout');
    },
} 

