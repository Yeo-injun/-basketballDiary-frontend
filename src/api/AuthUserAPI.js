import axios from '../common/customAxios';

const axiosService = axios.createClientForAws('/authUser');

export function tempApi(data) {
    // 구현하기
    return axiosService;
}

