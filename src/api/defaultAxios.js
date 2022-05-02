import axios from 'axios';

// API설정 공통화
// 참고자료 : https://jess2.xyz/vue/vue-tip/#2-router--%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%84%A4%EA%B3%84
export default {
    createDefault(apiUrl, apiServerUrl) {
        return axios.create({
            baseURL: `${apiServerUrl}${apiUrl}`,
            headers:{
                "Content-Type": "application/json"
            }
        })
    },
} 