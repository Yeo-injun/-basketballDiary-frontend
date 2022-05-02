import axios from './defaultAxios';
import { SERVER_URL } from './const';

const axiosService = axios.createDefault('/authUser', SERVER_URL.AWS);

export function tempApi(data) {
    // 구현하기
    return axiosService;
}

