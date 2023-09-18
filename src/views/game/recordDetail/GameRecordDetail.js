/** GameRecordDetailPage.vue 영역에서 사용되는 모든 컴포넌트에서 사용할 수 있는 js 메소드 */

import InputRule from '@/common/input/InputRule.js';
import InputRuleChecker from '@/common/input/InputRuleChecker.js';

export const ObjectFactory = {
	gameJoinPlayer(player, playerTypeCode) {
		const backNumber = prompt('등번호를 입력해주세요.', player.backNumber);

		const backNumberCheck = InputRuleChecker.check(
			backNumber,
			InputRule.backNumber
		);

		if (!backNumberCheck.isValid) {
			alert(backNumberCheck.message);
			return null;
		}

		// 새로운 객체로 반영
		return {
			gameJoinPlayerSeq: player.gameJoinPlayerSeq, // 게임참가선수Seq
			gameJoinTeamSeq: player.gameJoinTeamSeq, // 게임참가팀Seq
			playerTypeCode: playerTypeCode.code, // 선수유형코드
			playerTypeCodeName: playerTypeCode.name, // 선수유형코드명
			userSeq: player.userSeq, // 사용자Seq
			userName: player.userName, // 사용자이름
			backNumber: backNumber, // 등번호
			positionCode: player.positionCode, // 포지션코드
			positionCodeName: player.positionCodeName, // 포지션코드명
			email: player.email, // 이메일
		};
	},
};
