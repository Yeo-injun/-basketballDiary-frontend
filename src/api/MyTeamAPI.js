// Axois공통 모듈 적용 필요 
// import axios from './defaultAxios';
// import { SERVER_URL } from './const';

import axios from 'axios';

const HOST = 'http://localhost:8080/api/myTeams';

// 객체로 api모듈을 관리한다.
// http get 요청에 query string 추가하는 방법 : https://axios-http.com/docs/req_config
/**
 * axios.get('url',config[]) : config 스팩 속정중 params 정의
 */
export const myTeamApi = {
    getMyTeams(params) {
        return axios.get(`${HOST}`,{params}); 
    },
}
