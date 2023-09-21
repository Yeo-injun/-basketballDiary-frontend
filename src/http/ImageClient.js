// const IMAGE_SERVER_BASE_URI = process.env.VUE_APP_IMAGE_SERVER_URI;

export default {
	/**
	 * 이미지서버 URL 로 변환
	 */
	toImageServerUrl(url) {
		return `/image${url}`;
	},
};
