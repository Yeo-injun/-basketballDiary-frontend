// import axios from './defaultAxios';
// import { SERVER_URL } from './const';
import axios from '@/common/customAxios';

const axiosService = axios.createClientForAws('/loginUser');


export const profileApi = {
    // 구현하기
    getMyProfile(params){
        return axiosService.get('/profile',{params});
    }
};

