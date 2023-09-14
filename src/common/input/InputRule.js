import ValidationUtil from '@/common/util/ValidationUtil.js';

/**-----------------------------------
 * INPUT 항목별 Validion 정책 정의
 **-----------------------------------*/
export default {
	userName: [
		(value) => ValidationUtil.input.checkNotEmpty(value),
		(value) =>
			ValidationUtil.input.checkMaxLength(value, {
				maxLength: 20,
			}),
	],
	email: [
		(value) => ValidationUtil.input.checkNotEmpty(value),
		(value) => ValidationUtil.input.checkEmailPattern(value),
	],
	backNumber: [
		(value) => ValidationUtil.input.checkNotEmpty(value),
		(value) => ValidationUtil.input.checkNumberType(value),
		(value) =>
			ValidationUtil.input.checkMaxLength(value, {
				maxLength: 3,
				message: '등번호는 3자리수까지 입력 가능합니다.',
			}),
	],
};
