export default {
	/**
	 * Json타입의 객체를 넣으면 FormData객체로 return
	 * - Json의 모든 Key-Value쌍을 FormData 객체에 apppend
	 * - value가 이미지 타입이 아닌 경우 JSON.stringify()로 시리얼라이즈 처리
	 * 		cf. Content-type : application/json으로 별도 처리
	 * - objData내에 이미지 타입과 JSON타입의 메세지가 혼재되어도 처리가능
	 * @param { Object } objData
	 */
	toFormData(objData) {
		const jsonKeys = Object.keys(objData);
		const formData = new FormData();

		jsonKeys.forEach(function (key) {
			const value = toStringExceptImage(objData, key);
			if (isImageType(objData, key)) {
				formData.append(key, value);
				return;
			}
			// TODO 하나의 request메세지의 서로다른 Content-type을 처리하기 위한 처리작업
			// FormData와 Blob API 공부 필요
			formData.append(key, new Blob([value], { type: 'application/json' }), {
				contentType: 'application/json',
			});
		});

		return formData;
	},
};

function toStringExceptImage(data, key) {
	const value = data[key];
	if (isImageType(data, key)) {
		return value;
	}
	return JSON.stringify(value);
}

function isImageType(data, key) {
	const value = data[key];
	const valuType = value['type'];
	const nullTypes = new Set([null, undefined, '']);
	if (!nullTypes.has(valuType) && -1 < valuType.indexOf('image/')) {
		return true;
	}
	return false;
}
