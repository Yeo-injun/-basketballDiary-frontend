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
    /* API011 소속팀 개인프로필 조회 */
    findMyTeamsProfile(teamSeq) {
        console.log(teamSeq);
        return axiosService.get(`/${teamSeq}/profile`);
    },
    /* API001 : 소속팀 운영진 조회 */
    searchManagers(teamSeq) {
        return axiosService.get(`/${teamSeq}/managers`);
    },
    /* API002 : 소속팀 팀원목록 조회 */
    searchMembers(teamSeq) {
        return axiosService.get(`/${teamSeq}/members`);
    },    
    /* API016 : 소속팀 정보 단건 조회 */
    searchTeam(teamSeq) {
        return axiosService.get(`/${teamSeq}/info`);
    },
    /* API017 : 소속팀 정보 수정 */
    modifyMyTeam(teamSeq, teamInfo) {
        return axiosService.put(`/${teamSeq}/info`, {teamInfo});
    },  
    /**
     * injun 
     */
    searchInvitedPlayer(params) {
        return axiosService.get(`/${params.teamSeq}/joinRequestsTo`);
    },
}