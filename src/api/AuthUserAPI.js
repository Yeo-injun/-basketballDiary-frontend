import axios from '../common/customAxios';

const axiosService = axios.createClientForLocal('/loginUser');
axiosService.defaults.headers

export default {
    getJoinRequestsTo() {
        return axiosService.get('/joinRequestsTo');
    },

}

