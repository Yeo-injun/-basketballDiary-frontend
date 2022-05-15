import axios from '../common/customAxios';

const axiosService = axios.createClientForLocal('/loginUser');
// const axiosService = axios.createClientForAws('/loginUser');


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
        console.log(params);
        axiosService.post(`/profile`,params);
    }
}

