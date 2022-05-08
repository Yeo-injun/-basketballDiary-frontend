import axios from '../common/customAxios';

const axiosService = axios.createClientForLocal('/loginUser');

export default {
    getJoinRequestsTo() {
        return axiosService.get('/joinRequestsTo');
    },

}

