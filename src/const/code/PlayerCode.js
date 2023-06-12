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
	GUARD: createCodeObj('가드', '10'),
	FORWARD: createCodeObj('포워드', '20'),
	CENTER: createCodeObj('센터', '30'),
	POINT_GUARD: createCodeObj('포인트가드', '11'),
	SHOOTING_GAURD: createCodeObj('슈팅가드', '12'),
	SMALL_FORWARD: createCodeObj('스몰포워드', '23'),
	POWER_FORWARD: createCodeObj('파워포워드', '24'),
};

/**
 * 선수유형코드
 * 10 : "가드",
 * 20 : "포워드",
 * 30 : "센터",
 */
export const PlayerTypeCode = {
	TEAM_MEMBER: createCodeObj('팀원', '01'),
	AUTH_GUEST: createCodeObj('게스트(회원)', '02'),
	UNAUTH_GUEST: createCodeObj('게스트(비회원)', '03'),
};

function createCodeObj(codeName, codeValue) {
	return {
		name: codeName,
		code: codeValue,
	};
}
