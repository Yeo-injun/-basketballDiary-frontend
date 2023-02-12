import axios from '../common/CustomAxios';

const axiosService = axios.createAxiosInstance('/games');

export default {
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
			`/${params.gameSeq}/gameJoinTeams`,
			params.gameJoinTeamInfo
		);
	},
	/**
	 * API051 게임 삭제
	 */
	deleteGame(params) {
		return axiosService.delete(`/${params.gameSeq}`);
	},
	/**
	 * API046 게임 기초정보 조회
	 */
	getGameBasicInfo(params) {
		return axiosService.get(`/${params.gameSeq}/info`);
	},
	/**
	 * API047 경기참가팀 조회
	 */
	getGameJoinTeamsInfo(params) {
		return axiosService.get(`/${params.gameSeq}/teams`, {
			params: {
				homeAwayCode: params.homeAwayCode,
			},
		});
	},
	/**
	 * API061 경기참가선수 조회
	 */
	getGameJoinPlayers(params) {
		return axiosService.get(`/${params.gameSeq}/players`, {
			params: {
				homeAwayCode: params.homeAwayCode,
			},
		});
	},

	/**
	 * API063 게임전체쿼터 조회
	 */
	getGameAllQuartersRecords(params) {
		return axiosService.get(`/${params.gameSeq}/quarters`);
	},

	/**
	 * API050 경기 확정
	 */
	confirmGame(params) {
		return axiosService.post(`/${params.gameSeq}/confirmation`);
	},

	/**
	 * API035 게임참가 선수등록하기
	 */
	registerGameJoinPlayers(params) {
		return axiosService.post(
			`/${params.gameSeq}/gameJoinTeams/${params.gameJoinTeamSeq}/players`
		);
	},
};
