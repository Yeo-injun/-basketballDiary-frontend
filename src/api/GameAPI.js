import axios from '@/http/CustomAxios.js';

const axiosService = axios.createAxiosInstance('/games');

export default {
	/**
	 * API035 게임참가 선수등록하기
	 */
	registerGameJoinPlayers(pathVar, reqBody) {
		return axiosService.post(
			`/${pathVar.gameSeq}/homeAwayCode/${pathVar.homeAwayCode}/players`,
			{
				gameJoinPlayers: reqBody.gameJoinPlayers,
			}
		);
	},
	/**
	 * API038 쿼터기록 저장하기
	 */
	saveQuarterRecords(params) {
		return axiosService.put(
			`/${params.gameSeq}/quarters/${params.quarterCode}`,
			{
				homeTeamPlayerRecords: params.homeTeamPlayerRecords,
				awayTeamPlayerRecords: params.awayTeamPlayerRecords,
			}
		);
	},

	/**
	 * API040 게임엔트리 조회
	 */
	getGameEntry(params) {
		return axiosService.get(
			`/${params.gameSeq}/quarters/${params.quarterCode}/entry`,
			{
				homeAwayCode: params.homeAwayCode,
			}
		);
	},
	/**
	 * API041 게임쿼터삭제
	 */
	deleteGameQuarter(params) {
		return axiosService.delete(
			`/${params.gameSeq}/quarters/${params.quarterCode}`
		);
	},
	/**
	 * API043 참가선수 쿼터기록조회
	 */
	getGameJoinPlayerRecordsByQuarter(params) {
		return axiosService.get(
			`/${params.gameSeq}/quarters/${params.quarterCode}/players`,
			{
				homeAwayCode: params.homeAwayCode,
			}
		);
	},
	/**
	 * API044 : 상대팀 찾기
	 */
	searchOpponents(params) {
		return axiosService.get(`/opponents`, { params });
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
	 * API048 경기쿼터기록 조회
	 */
	getGameQuarterRecords(params) {
		return axiosService.get(
			`/${params.gameSeq}/quarters/${params.quarterCode}`
		);
	},

	/**
	 * API050 경기 확정
	 */
	confirmGame(params) {
		return axiosService.post(`/${params.gameSeq}/confirmation`);
	},

	/**
	 * API051 게임 삭제
	 */
	deleteGame(params) {
		return axiosService.delete(`/${params.gameSeq}`);
	},
	/**
	 * API053 : 게임생성하기
	 */
	createGame(params) {
		return axiosService.post('', params);
	},
	/**
	 * API055 : 경기기록 권한자 목록 조회
	 */
	getGameRecorders(params) {
		return axiosService.get(`/${params.gameSeq}/gameRecorders`, params);
	},
	/**
	 * API056 : 경기기록 권한자 목록 저장
	 */
	saveGameRecorders(pathVar, reqBody) {
		return axiosService.post(`/${pathVar.gameSeq}/gameRecorders`, {
			gameSeq: pathVar.gameSeq,
			gameRecorders: reqBody.gameRecorders,
		});
	},
	/**
	 * API057 : 경기참가팀 팀원 조회
	 */
	getGameJoinTeamMembers(params) {
		return axiosService.get(`/${params.gameSeq}/teamMembers`, {
			homeAwayCode: params.homeAwayCode,
		});
	},
	/**
	 * API060 엔트리 저장
	 */
	saveEntry(params) {
		return axiosService.post(`/${params.gameSeq}/entry`, params);
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
	 * API062 게임참가팀 확정
	 */
	confirmJoinTeam(params) {
		return axiosService.post(
			`/${params.gameSeq}/gameJoinTeams`,
			params.gameJoinTeamInfo
		);
	},
	/**
	 * API063 게임전체쿼터 조회
	 */
	getGameAllQuartersRecords(params) {
		return axiosService.get(`/${params.gameSeq}/quarters`);
	},

	/**
	 * API064 게임쿼터 기초정보생성
	 */
	createGameQuarterBasicInfo(params) {
		return axiosService.post(
			`/${params.gameSeq}/quarters/${params.quarterCode}`,
			params
		);
	},
};
