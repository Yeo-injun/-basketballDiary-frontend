import axios from 'axios';

// API설정 공통화
const API_SERVER = {
    AWS : 'http://54.180.147.129/api',
    LOCAL : 'http://127.0.0.1:8080/api',
}
// 참고자료 : https://jess2.xyz/vue/vue-tip/#2-router--%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%84%A4%EA%B3%84
export default {
    createClientForAws(apiUrl) {
        return axios.create({
            baseURL: `${API_SERVER.AWS}${apiUrl}`,
            headers:{
                "Content-Type": "application/json"
            }
        })
    },
    createClientForLocal(apiUrl) {
        return axios.create({
            baseURL: `${API_SERVER.LOCAL}${apiUrl}`,
            headers:{
                "Content-Type": "application/json"
            }
        })
    },
} 