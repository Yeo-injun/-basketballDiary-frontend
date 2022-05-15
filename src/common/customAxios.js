import axios from 'axios';

const API_SERVER = {
    AWS : 'http://54.180.147.129/api',
    LOCAL : 'http://127.0.0.1:8080/api',
}

// CORS처리 필요 : https://inpa.tistory.com/entry/AXIOS-%F0%9F%93%9A-CORS-%EC%BF%A0%ED%82%A4-%EC%A0%84%EC%86%A1withCredentials-%EC%98%B5%EC%85%98
// 참고자료 : https://jess2.xyz/vue/vue-tip/#2-router--%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%84%A4%EA%B3%84
/**
 * request에 cookie값이 세팅되지 않는 이유 : CORS + sameSite속성의 기본값 떄문에
 * CORS일 경우 백엔드와 프론트에서 각각 설정을 추가해줘야 함. withCredential = true
 * samsSite설정은 백엔드에서 cookie생성시 설정 : 웹서버 설정을 변경하거나, cookie생성시 설정을 추가해서 생성해주기
 */
export default {
    createClientForAws(apiUrl) {
        return axios.create({
            baseURL: `${API_SERVER.AWS}${apiUrl}`,
            withCredentials: true,  
            headers:{
                "Content-Type": "application/json"
            }
        })
    },
    createClientForLocal(apiUrl) {
        return axios.create({
            baseURL: `${API_SERVER.LOCAL}${apiUrl}`,
            withCredentials: true,
            headers:{
                "Content-Type": "application/json",
            }
        })
    },
} 