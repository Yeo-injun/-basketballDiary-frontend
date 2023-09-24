export default {
	/**
	 * Multipart Header생성
	 */
	createMultipartHeader() {
		return {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
	},
};
