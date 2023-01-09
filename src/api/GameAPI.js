import axios from '../common/CustomAxios';

const axiosService = axios.createAxiosInstance('/games');

export default {
	/** injun */
	/**
	 * API044 : 상대팀 찾기
	 */
	searchOpponents(params) {
		return axiosService.get(`/opponents`, { params });
	},
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
