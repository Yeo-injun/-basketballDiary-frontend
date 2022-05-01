import axios from './defaultAxios';
import { SERVER_URL } from './const';

const axiosService = axios.createDefault('/myTeams', SERVER_URL.LOCAL);

// 객체로 api모듈을 관리한다.
export const myTeamApi = {
    getMyTeams(data) {
        return axiosService.get(`/${data.userSeq}`); 
    },
}
