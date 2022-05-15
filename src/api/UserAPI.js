import axios from '../common/customAxios';

// API설정 공통화
// const axiosService = axios.createClientForAws('/user');
const axiosService = axios.createClientForLocal('/user');


export default {
    login(params) {
        return axiosService.post('/login', params);
    },
    logout() {
        return axiosService.post('/logout');
    },
} 

