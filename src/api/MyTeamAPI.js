import axios from 'axios';

// API설정 공통화
// 참고자료 : https://jess2.xyz/vue/vue-tip/#2-router--%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%84%A4%EA%B3%84
const axiosService = axios.create({
    // baseURL: 'http://54.180.147.129/api/myTeams'
    baseURL:'http://localhost:8080/api/myTeams',
    headers:{
        "Content-Type": "application/json"
    }
})

<<<<<<< HEAD
// 객체로 api모듈을 관리한다.
export const myTeamApi = {
    getMyTeams(data) {
        return axiosService.get(`/${data.userSeq}`); 
    },
}
=======
export const tempApi = {
    getMyTeams (data) {
        return axiosService.get(`/${data.userSeq}`);
    }
}
>>>>>>> 73ffae477db2804d841880c36724b2317adabdee
