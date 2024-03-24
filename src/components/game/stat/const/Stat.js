/**
 * 게임 스탯의 유형 Const관리
 * - 득점
 * - 리바운드
 * - 스틸
 * ...
 */

export const StatType = {
	FREE_THROW: 'freeThrow',
	TWO_POINT: 'twoPoint',
	THREE_POINT: 'threePoint',
	TRY_FREE_THROW: 'tryFreeThrow',
	TRY_TWO_POINT: 'tryTwoPoint',
	TRY_THREE_POINT: 'tryThreePoint',
	FOUL: 'foul',
	TURNOVER: 'turnover',
	REBOUND: 'rebound',
	ASSIST: 'assist',
	BLOCK: 'block',
	STEAL: 'steal',
};

export const RecordMode = {
	ADD: 'add',
	CANCEL: 'cancel',
};
