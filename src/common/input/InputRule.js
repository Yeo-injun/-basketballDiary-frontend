import ValidationUtil from '@/common/util/ValidationUtil.js';

/**-----------------------------------
 * INPUT 항목별 Validion 정책 정의
 * - 정의된 함수를 모두 충족시켜야 유효한 입력값이다.
 **-----------------------------------*/
export default {
	userId: [
		(value) => ValidationUtil.input.checkNotEmpty(value),
		// TODO userId 패턴 정규식으로 검증하는 로직 추가
	],
	password: [
		(value) => ValidationUtil.input.checkNotEmpty(value),
		// TODO password 패턴 정규식으로 검증하는 로직 추가
	],
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
