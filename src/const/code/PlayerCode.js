import CodeUtil from '@/const/code/CodeUtil.js';
/**
 * 포지션코드
 * 10 : "가드",
 * 20 : "포워드",
 * 30 : "센터",
 * 11 : "포인트가드",
 * 12 : "슈팅가드",
 * 23 : "스몰포워드",
 * 24 : "파워포워드",
 */
export const PositionCode = {
	GUARD: CodeUtil.createCodeNameObj('가드', '10'),
	FORWARD: CodeUtil.createCodeNameObj('포워드', '20'),
	CENTER: CodeUtil.createCodeNameObj('센터', '30'),
	POINT_GUARD: CodeUtil.createCodeNameObj('포인트가드', '11'),
	SHOOTING_GAURD: CodeUtil.createCodeNameObj('슈팅가드', '12'),
	SMALL_FORWARD: CodeUtil.createCodeNameObj('스몰포워드', '23'),
	POWER_FORWARD: CodeUtil.createCodeNameObj('파워포워드', '24'),
};

/**
 * 선수유형코드
 * 10 : "가드",
 * 20 : "포워드",
 * 30 : "센터",
 */
export const PlayerTypeCode = {
	TEAM_MEMBER: CodeUtil.createCodeNameObj('팀원', '01'),
	AUTH_GUEST: CodeUtil.createCodeNameObj('게스트(회원)', '02'),
	UNAUTH_GUEST: CodeUtil.createCodeNameObj('게스트(비회원)', '03'),
};
