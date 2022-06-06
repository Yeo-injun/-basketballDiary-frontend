import axios from '../common/CustomAxios';

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
    deleteUser(){
        return axiosService.delete('/profile');
    },
    updatePassword(params){
        return axiosService.post("/profile/password",params);
    }
}

