import CodeUtil from '@/const/code/CodeUtil.js';
// TODO CodeUtil적용시키기...

/**
 * 게임유형코드
 * 01 : 자체전
 * 02 : 교류전
 * 03 : 대회
 */
export const GameTypeCode = {
	SELF_GAME: CodeUtil.createCodeNameObj('자체전', '01'),
	MATCH_UP_GAME: CodeUtil.createCodeNameObj('교류전', '02'),
	COMPETITION: CodeUtil.createCodeNameObj('대회', '03'),
};

/**
 * 게임기록상태코드
 * 01 : CREATION(게임생성)
 * 02 : JOIN_TEAM_CONFIRMATION(참가팀확정)
 * 03 : CONFIRMATION(게임확정)
 */
export const GameRecordStateCode = {
	CREATION: CodeUtil.createCodeNameObj('게임생성', '01'),
	JOIN_TEAM_CONFIRMATION: CodeUtil.createCodeNameObj('참가팀확정', '02'),
	GAME_CONFIRMATION: CodeUtil.createCodeNameObj('게임확정', '03'),
};

/**
 * 홈/어웨이 코드
 * 01 : HOME_TEAM(홈팀)
 * 02 : AWAY_TEAM(어웨이팀)
 */
export const HomeAwayCode = {
	HOME_TEAM: '01',
	AWAY_TEAM: '02',
};

/**
 * 쿼터 코드
 * 01 : QUARTER_1ST(1쿼터)
 * 02 : QUARTER_2ND(2쿼터)
 * 03 : QUARTER_3RD(3쿼터)
 * 04 : QUARTER_4TH(4쿼터)
 */
export const QuarterCode = {
	QUARTER_1ST: '01',
	QUARTER_2ND: '02',
	QUARTER_3RD: '03',
	QUARTER_4TH: '04',
};

/**
 * 경기 기록권한 코드
 * 01 : CREATOR(경기생성자)
 * 02 : ONLY_WRITER(경기기록자)
 */
export const GameRecordAuthCode = {
	CREATOR: CodeUtil.createCodeNameObj('경기생성자', '01'),
	ONLY_WRITER: CodeUtil.createCodeNameObj('경기기록자', '02'),
};
