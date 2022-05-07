import axios from './defaultAxios';
import { SERVER_URL } from './const';

const axiosService = axios.createDefault('/loginUser', SERVER_URL.LOCAL);


export const profileApi = {
    // 구현하기
    getMyProfile(params){
        return axiosService.get('/profile',{params});
    },
    setMyProfile(params){
        console.log(params);
        return axiosService.post("/profile",params);
    },
};

