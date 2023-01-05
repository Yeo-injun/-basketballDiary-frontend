import axios from '../common/CustomAxios';

const axiosService = axios.createAxiosInstance('/games');

export default {
	/** injun */
	/**
	 * API053 : 게임생성하기
	 */
	createGame(params) {
		return axiosService.post('', params);
	},
	/**
	 * API062 게임참가팀 확정
	 */
	confirmJoinTeam(params) {
		return axiosService.post(
			`${params.gameSeq}/gameJoinTeams`,
			params.gameJoinTeamInfo
		);
	},
};
