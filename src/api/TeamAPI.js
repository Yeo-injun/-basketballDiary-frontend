/* eslint-disable */
import axios from '@/http/CustomAxios.js';

/** Components */
// 권한정보를 관리하는 Manager 객체 
import AuthManager from '@/common/auth/AuthManager.js';

const axiosService = axios.createAxiosInstance('/teams');

export default {
	/** API019 : 팀 목록 조회 */
	searchTeams(params) {
		return axiosService.get('', { params });
	},
	/** API021 : 팀 등록 */
	async registerTeam(params) {
		const response = await axiosService.postWithMultipart('', params);
		// 서버의 권한정보 재조회하여 초기화 
		AuthManager.init(); 
		return response;
	},
	/* API052 : 소속팀 게임목록조회 */
	searchTeamGames( path, query ) {
		return axiosService.get(`/${path.teamSeq}/games`, {
			params: {
				pageNo			: query.pageNo			,
				gameBgngYmd		: query.gameBgngYmd		,
				gameEndYmd		: query.gameEndYmd		,
				sidoCode		: query.sidoCode		,
				gamePlaceName	: query.gamePlaceName	,
				gameTypeCode	: query.gameTypeCode	,
				homeAwayCode	: query.homeAwayCode	,
			},
		});
	},
};
