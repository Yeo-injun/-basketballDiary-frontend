/**-----------------------------------
 * INPUT 항목별 Validion 정책 체크
 **-----------------------------------*/
export default {
	/**
	 *
	 * @param {*} value 유효한 입력값인지 확인하는 대상 값
	 * @param {*} rules 입력값이 갖추어야 하는 요건을 정의한 함수 ( 정책이 여러개일 경우 함수가 담긴 Array )
	 * @returns {
	 * 	isValid : rules을 모두 충족한 value면 true / 그외의 경우는 false
	 * 	message : isValid가 false일 경우 충족시키지 못한 정책의 메세지를 return
	 * }
	 */
	check(value, rules) {
		if (typeof rules === 'function') {
			return rules(value);
		}

		if (!Array.isArray(rules)) {
			throw new Error('Input 정책이 정의된 Array가 필요합니다.');
		}

		for (const rule of rules) {
			if (typeof rule !== 'function') {
				throw new Error('Input 정책이 정의된 함수가 필요합니다.');
			}
			const ruleCheckResult = rule(value);
			const isCompliantRule = ruleCheckResult === true;
			if (isCompliantRule) {
				continue;
			}
			return {
				isValid: false,
				message: ruleCheckResult,
			};
		}
		return {
			isValid: true,
			message: '유효한 입력값입니다.',
		};
	},
};
