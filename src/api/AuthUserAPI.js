import axios from '../common/customAxios';

const axiosService = axios.createClientForLocal('/loginUser');

export default {
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
    }
}

