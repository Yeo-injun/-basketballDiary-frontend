/* eslint-disable */
import axios from '../common/CustomAxios';

const axiosService = axios.createAxiosInstance('/teams');

export default {
    /** API019 : 팀 목록 조회 */
    searchTeamList(params) {
        return axiosService.get('', {params});
    },
    /** API021 : 팀 등록 */
    registerTeam(params) {
        return axiosService.post('', params);
    },
}

