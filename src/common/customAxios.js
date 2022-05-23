import axios from 'axios';
import router from "@/router"

// TODO API호출 발생시 예외 페이지로 이동시키기 공통화
// 인터셉터 참고자료 : https://yamoo9.github.io/axios/guide/interceptors.html
// https://velog.io/@skyepodium/axios-%EC%9D%B8%ED%84%B0%EC%85%89%ED%84%B0%EB%A1%9C-API-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0
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

const ERROR_CODE = {
    BAD_REQUEST : 400,
    UNAUTHORIZED : 401, 
    NOT_FOUND : 404,
    CONFLICT : 409,
}

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
        const axiosInstance = axios.create({
            baseURL: `${API_SERVER.LOCAL}${apiUrl}`,
            withCredentials: true,
            headers:{
                "Content-Type": "application/json",
            }
        });
        axiosInstance.interceptors.response.use(
            null,
            function(error) {
                // 참고자료 : 인터셉터 등록해서 에러코드에 따라서 에러페이지 분기처리 
                // https://medium.com/@saulchelewani/custom-error-pages-with-vue-router-and-axios-response-interceptors-based-on-api-response-54ff1375376d
                console.log(process.env.VUE_APP_GLOBAL_TEST);
                console.log(process.env.VUE_APP_API_URI);
                let path = '/error';
                switch (error.response.status) {
                    case ERROR_CODE.UNAUTHORIZED : path = '/login'; break;
                    // 기본 에러페이지를 만들고, 
                    // 에러코드별로 에러페이지 만들기
                    // case ERROR_CODE.NOT_FOUND : path = '/signup'; break;
                }
                router.push(path);
                return Promise.reject(error);
            }
        );
        return axiosInstance;
    },
    // 실행모드에 따라 환경변수 동적으로 반영하기
    // 참고자료 : https://velog.io/@skyepodium/vue-%EC%8B%A4%ED%96%89-%EB%AA%A8%EB%93%9C%EC%99%80-%ED%99%98%EA%B2%BD-%EB%B3%80%EC%88%98-%EC%84%A4%EC%A0%95
    // .env환경변수 파일 만들기, 실행모드 스크립트 작성하기 -> package.json
    createAxiosInstance(apiUrl) {
        const axiosInstance = axios.create({
            baseURL: `${process.env.VUE_APP_API_URI}${apiUrl}`,
            withCredentials: true,
            headers:{
                "Content-Type": "application/json",
            }
        });
        axiosInstance.interceptors.response.use(
            null,
            function(error) {
                // 참고자료 : 인터셉터 등록해서 에러코드에 따라서 에러페이지 분기처리 
                // https://medium.com/@saulchelewani/custom-error-pages-with-vue-router-and-axios-response-interceptors-based-on-api-response-54ff1375376d
                console.log(process.env.VUE_APP_GLOBAL_TEST);
                console.log(process.env.VUE_APP_API_URI);
                let path = '/error';
                switch (error.response.status) {
                    case ERROR_CODE.UNAUTHORIZED : path = '/login'; break;
                    // 기본 에러페이지를 만들고, 
                    // 에러코드별로 에러페이지 만들기
                    // case ERROR_CODE.NOT_FOUND : path = '/signup'; break;
                }
                router.push(path);
                return Promise.reject(error);
            }
        );
        return axiosInstance;
    }
} 