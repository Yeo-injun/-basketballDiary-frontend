import ValidationUtil from '@/common/util/ValidationUtil.js';

/**-----------------------------------
 * INPUT 항목별 Validion 정책 위반 처리
 **-----------------------------------*/
export default {
	/**
	 * input 에러메세지를 alert처리한다.
	 * - input별로 에러메세지를 관리하는 객체를 받아서 메세지가 존재하는 속성의 메세지 내용을 alert한다.
	 * @param { Object } errorMessage input별로 에러메세지를 관리하는 객체
	 */
	alert( errorMessage ) {
		if ( typeof errorMessage !== 'object' ) {
			throw new Error( 'errorMessage은 Object타입이어야 합니다.' );
		}

		if ( !hasMessage( errorMessage ) ) {
			return;
		}

		const inputNames = Object.keys( errorMessage );
		for ( const inputName of inputNames ) {
			const message = errorMessage[ inputName ];
			if ( ValidationUtil.isNull( message ) ) {
				continue;
			}
			alert( message );
			return;
		}
	},
};

function hasMessage( errorMessage ) {
	return Object.keys( errorMessage ).length > 0;
}
