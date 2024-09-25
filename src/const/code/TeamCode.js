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
export const TeamAuth = {
	LEADER		: CodeUtil.createCodeNameObj( "팀장"     	, "3" ),
    MANAGER		: CodeUtil.createCodeNameObj( "관리자"    	, "2" ),
    TEAM_MEMBER : CodeUtil.createCodeNameObj( "일반팀원"  	, "1" ),
};

