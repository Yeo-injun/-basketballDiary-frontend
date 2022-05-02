import axios from 'axios';

const HOST = 'http://localhost:8080/api/myTeams';

// API설정 공통화
// 참고자료 : https://jess2.xyz/vue/vue-tip/#2-router--%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%84%A4%EA%B3%84
// const axiosService = axios.create({
//     // baseURL: 'http://54.180.147.129/api/myTeams'
//     baseURL:'http://localhost:8080/api/myTeams',
//     headers:{
//         "Content-Type": "application/json"
//     }
// })

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