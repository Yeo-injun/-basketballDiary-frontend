import axios from '../common/customAxios';

const axiosService = axios.createAxiosInstance('/loginUser');


export default {
    // 인준 테스트용
    getJoinRequestsTo() {
        return axiosService.get('/joinRequestsTo');
    },
    /**
     * seongju
     */
    getMyInfo(){
        return axiosService.get(`/profile`);
    },
    updateUser(params){
        // console.log(params);
        return axiosService.post(`/profile`,params);
    },
}

