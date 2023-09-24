export default {
	/**
	 * Json타입의 객체를 넣으면 FormData객체로 return
	 * - Json의 모든 Key-Value쌍을 FormData 객체에 apppend
	 * @param { Object } jsonObj
	 */
	toFormData(jsonObj) {
		const jsonKeys = Object.keys(jsonObj);
		const formData = new FormData();

		jsonKeys.forEach(function (key) {
			const value = jsonObj[key];
			formData.append(key, value);
		});

		return formData;
	},
};
