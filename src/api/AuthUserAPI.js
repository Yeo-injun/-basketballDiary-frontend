import axios from '../common/customAxios';

const axiosService = axios.createClientForLocal('/loginUser');
// const axiosService = axios.createClientForAws('/loginUser');


export default {
    getJoinRequestsTo() {
        return axiosService.get('/joinRequestsTo');
    },

}

