import axios from '../common/CustomAxios';

const axiosService = axios.createAxiosInstance('/loginUser');


export default {
    /**
     * injun
     */
    // API022 : 농구팀 가입요청 목록 조회
    getJoinRequestsTo() {
        return axiosService.get('/joinRequestsTo');
    },
    // API032 : 농구팀 초대 목록 조회  
    getJoinRequestsFrom() {
        return axiosService.get('/joinRequestsFrom');
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

