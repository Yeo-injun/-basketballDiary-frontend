/* eslint-disable */
import axios from '../common/CustomAxios';

const axiosService = axios.createAxiosInstance('/teams');

export default {
    searchTeamList(params) {
        return axiosService.get('', {params});
    },
}

