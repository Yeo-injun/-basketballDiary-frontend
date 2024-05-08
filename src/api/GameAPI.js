import axios from '@/http/CustomAxios.js';
import ValidationUtil from '@/common/util/ValidationUtil.js';

const axiosService = axios.createAxiosInstance('/games');
/**
 * API 메소드 생성 규칙
 * 1. 메소드의 파라미터는 사용되는 용도에 맞게 분리한다.
 * 	- PathVariable
 * 	- QueryString
 * 	- RequestBody
 *
 * 2. 메소드 내부에서 API 메세지 규약을 체크한다.
 * 	- 필수값 여부
 * 	- 값의 Type, 길이 등
 */
export default {
	/**
	 * API061 경기 전체 참가선수 조회 ( 홈/어웨이 팀 모두 )
	 */
	getAllGameJoinPlayers(params) {
		return axiosService.get(`/${params.gameSeq}/players`, {
			params: {
				homeAwayCode: params.homeAwayCode,
				pageNo 		: params.pageNo,
			},
		});
	},
	/**
	 * API066 경기참가선수 조회 (홈/어웨이 팀별로 )
	 */
	getGameJoinPlayers(params) {
		return axiosService.get(`/${params.gameSeq}/homeAwayCode/${params.homeAwayCode}/players`, {
			params: {
				pageNo 		: params.pageNo,
			},
		});
	},
	/**
	 * API067 경기참가선수 추가 TODO 설계 필요
	 */
	addGameJoinPlayer( params ) {
		return axiosService.post(
			`/${params.gameSeq}/homeAwayCode/${params.homeAwayCode}/player`,
			{
				playerTypeCode	: params.playerTypeCode,      // 선수유형코드
				userSeq			: params.userSeq,             // 사용자Seq
				userName		: params.userName,            // 사용자이름
				backNumber		: params.backNumber,          // 등번호
				positionCode	: params.positionCode,        // 포지션코드
				email			: params.email,               // 이메일
			}
		);
	},
	/**
	 * API068 경기참가선수 삭제
	 * TODO API 설계서에 추가 요망
	 */
	deleteGameJoinPlayer( params ) {
		return axiosService.delete(
			`/${params.gameSeq}/homeAwayCode/${params.homeAwayCode}/players/${params.gameJoinPlayerSeq}`
		);
	},
	/**
	 * API038 쿼터기록 저장하기
	 */
	saveQuarterRecords(pathVar, reqBody) {
		if (ValidationUtil.isNull(reqBody.quarterTime)) {
			throw new Error('쿼터시간은 필수 입력항목입니다.');
		}
		return axiosService.put(
			`/${pathVar.gameSeq}/quarters/${pathVar.quarterCode}`,
			{
				quarterTime: reqBody.quarterTime,
				homeTeamPlayerRecords: reqBody.homeTeamPlayerRecords,
				awayTeamPlayerRecords: reqBody.awayTeamPlayerRecords,
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
		return axiosService.get(`/${params.gameSeq}/recorders`, params);
	},
	/**
	 * API056 : 경기기록 권한자 목록 저장
	 */
	saveGameRecorders( params ) {
		return axiosService.post(
			`/${params.gameSeq}/recorders`,
			{
				gameSeq			: params.gameSeq,
				gameRecorders	: params.gameRecorders,
			}
		);
	},
	/**
	 * API057 : 경기기록원 후보 조회
	 */
	async getGameRecorderCandidates( params ) {
		const { data } = await axiosService.get(
			`/${params.gameSeq}/recorders/candidates`, 
			{
				params: {
					homeAwayCode: params.homeAwayCode,
				},
			}
		);
		return data;
	},
	/**
	 * API060 엔트리 저장
	 */
	saveEntry(params) {
		return axiosService.post(`/${params.gameSeq}/entry`, params);
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
