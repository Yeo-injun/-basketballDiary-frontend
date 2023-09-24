/** GameRecordDetailPage.vue 영역에서 사용되는 모든 컴포넌트에서 사용할 수 있는 js 메소드 */
import ValidationUtil from '@/common/util/ValidationUtil';
import InputRule from '@/common/input/InputRule.js';
import InputRuleChecker from '@/common/input/InputRuleChecker.js';

export const ObjectFactory = {
	gameJoinPlayerWithBackNumber(player, playerTypeCode, backNumber) {
		// 새로운 객체로 생성
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

/**
 * 사용자의 입력값을 받아서 처리하는 역할 수행
 */
export const UIPrompter = {
	backNumber(oldValue) {
		const backNumber = prompt(
			'등번호를 입력해주세요.',
			ValidationUtil.isNull(oldValue) ? '' : oldValue
		);

		// 등번호 입력을 취소했을 때 객체는 생성 중지 :null return ( propmt 취소시 null 반환 )
		const isCancel = null === backNumber;
		if (isCancel) {
			return '';
		}

		const backNumberCheck = InputRuleChecker.check(
			backNumber,
			InputRule.backNumber
		);

		if (!backNumberCheck.isValid) {
			alert(backNumberCheck.message);
			return null;
		}
		return backNumber;
	},
};
