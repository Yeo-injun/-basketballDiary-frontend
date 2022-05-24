import axios from '../common/customAxios';

const axiosService = axios.createClientForLocal('/loginUser');
// const axiosService = axios.createClientForAws('/loginUser');


export default {
    // 인준 테스트용
    getJoinRequestsTo() {
        return axios.createAxiosInstance('/loginUser').get('/joinRequestsTo');
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

