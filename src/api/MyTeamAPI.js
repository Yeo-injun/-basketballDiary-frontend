import axios from '@/common/CustomAxios';
const axiosService = axios.createAxiosInstance('/myTeams');

// http get 요청에 query string 추가하는 방법 : https://axios-http.com/docs/req_config
/**
 * axios.get('url',config[]) : config 스팩 속정중 params 정의
 */
export default {
    /**
     * seongju 
     */
    searchTeams(){
        return axiosService.get();
    },
    modifyMyTeamsProfile(params){
        console.log(params);
        return axiosService.post(`/${params.teamSeq}/profile`,{params});
    },
    /**
     * changgi 
     */
    findMyTeamsProfile(teamSeq) {
        console.log(teamSeq);
        return axiosService.get(`/${teamSeq}/profile`);
    },
    searchManagers(teamSeq) {
        return axiosService.get(`/${teamSeq}/managers`);
    },
    searchMembers(teamSeq) {
        return axiosService.get(`/${teamSeq}/members`);
    },    
}