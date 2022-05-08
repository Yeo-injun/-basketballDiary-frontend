import axios from 'axios';

// axios.defaults.withCredentials = true; // request헤더에 쿠키를 자동으로 담아주기 위한 설정 : CORS요청의 표준은 cookie정보를 request헤더에 담지 않음.

const API_SERVER = {
    AWS : 'http://54.180.147.129/api',
    LOCAL : 'http://127.0.0.1:8080/api',
}

// CORS처리 필요 : https://inpa.tistory.com/entry/AXIOS-%F0%9F%93%9A-CORS-%EC%BF%A0%ED%82%A4-%EC%A0%84%EC%86%A1withCredentials-%EC%98%B5%EC%85%98
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
        const createdAxios = axios.create({
            baseURL: `${API_SERVER.LOCAL}${apiUrl}`,
            withCredentials: true,
            headers:{
                "Content-Type": "application/json",
            }
        })
        return createdAxios;
    },
} 