// Axois공통 모듈 적용 필요 
import axios from './defaultAxios';
import { SERVER_URL } from './const';

// API설정 공통화
const axiosService = axios.createDefault('/myTeams', SERVER_URL.LOCAL);

// 객체로 api모듈을 관리한다.
// http get 요청에 query string 추가하는 방법 : https://axios-http.com/docs/req_config
/**
 * axios.get('url',config[]) : config 스팩 속정중 params 정의
 */
export const myTeamApi = {
    getMyTeams(params) {
        return axiosService.get('', {params}); 
    },
}