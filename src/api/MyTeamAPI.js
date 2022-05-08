import axios from '@/common/customAxios';
const axiosService = axios.createClientForLocal('/myTeams');

// http get 요청에 query string 추가하는 방법 : https://axios-http.com/docs/req_config
/**
 * axios.get('url',config[]) : config 스팩 속정중 params 정의
 */
export const myTeamApi = {
    getMyTeams(params) {
        return axiosService.get('', {params}); 
    },
    findMyTeamsProfile(params) {
        return axiosService.get('/${params.teamId}/profile', {params});
    },
    searchManagers(params) {
        return axiosService.get('/${params.teamId}/managers', {params});
    },
    searchMembers(params) {
        return axiosService.get('/${params.teamId}/members', {params});
    },
}