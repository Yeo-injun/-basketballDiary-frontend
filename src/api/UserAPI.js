import axios from '../common/CustomAxios';

// API설정 공통화
const axiosService = axios.createAxiosInstance('/user');


export default {
    login(params) {
        return axiosService.post('/login', params);
    },
    logout() {
        return axiosService.post('/logout');
    },
    createUser(params) {
        return axiosService.post('/registration', params);
    },
    checkDuplicateUserId(params) {
        return axiosService.post('/duplicationCheck', params);
    },

} 

