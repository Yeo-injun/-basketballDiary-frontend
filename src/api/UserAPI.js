import axios from './defaultAxios';
import { SERVER_URL } from './const';

// API설정 공통화
<<<<<<< Updated upstream
const axiosService = axios.createDefault('/user', SERVER_URL.AWS);
=======
// 참고자료 : https://jess2.xyz/vue/vue-tip/#2-router--%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%84%A4%EA%B3%84
const axiosService = axios.create({
    // baseURL: 'http://54.180.147.129/api/user'
    baseURL: 'http://localhost:8080/api/user'
})
>>>>>>> Stashed changes

export default {
    login(data) {
        return axiosService.post('/login', data);
    },
    logout() {
        return axiosService.post('/logout');
    },
} 

