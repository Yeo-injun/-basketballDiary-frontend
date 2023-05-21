export default {
	/** null체크 */
	isNull(val) {
		return _isNull(val);
	},
	isNotNull(val) {
		return !_isNull(val);
	},
	ifNullToEmptyString(val) {
		if (_isNull(val)) {
			return '';
		}
		return val;
	},
	// 입력값 검증
	input: {
		checkNotEmpty(value) {
			return !_isNull(value) || `필수입력 항목입니다.`;
		},
		checkNumberType(value) {
			return !isNaN(value) || `숫자만 입력가능합니다.`;
		},
		checkMaxLength(value, restrictions) {
			const targetVal = value || '';
			const maxLen = restrictions?.maxLength || 5;
			const restrictionMsg =
				restrictions?.message || `최대 입력 가능 길이는 ${maxLen} 입니다.`;
			return targetVal.length <= maxLen || restrictionMsg;
		},
		checkEmailPattern(value, restrictions) {
			const restrictionMsg = restrictions?.message || `이메일 형식이 아닙니다.`;

			const emailPattern =
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return emailPattern.test(value) || restrictionMsg;
		},
	},
};

// ValidationUtils내에서만 접근할 수 있는 전역함수
function _isNull(val) {
	if (
		val == null ||
		val == undefined ||
		(typeof val == 'string' && val == '') ||
		(Array.isArray(val) && val.length == 0) ||
		(typeof val == 'object' && Object.keys(val).length == 0)
	) {
		return true;
	}
	return false;
}
