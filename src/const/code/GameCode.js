/**
 * 게임유형코드
 * 01 : 자체전
 * 02 : 교류전
 * 03 : 대회
 */
export const GameTypeCode = {
	SELF_GAME: '01',
	MATCH_UP_GAME: '02',
	COMPETITION: '03',
};

/**
 * 게임기록상태코드
 * 01 : CREATION(게임생성)
 * 02 : JOIN_TEAM_CONFIRMATION(참가팀확정)
 * 03 : CONFIRMATION(게임확정)
 */
export const GameRecordStateCode = {
	CREATION: '01',
	JOIN_TEAM_CONFIRMATION: '02',
	CONFIRMATION: '03',
};
