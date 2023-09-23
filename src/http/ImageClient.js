// const IMAGE_SERVER_BASE_URI = process.env.VUE_APP_IMAGE_SERVER_URI;

export default {
	/**
	 * 이미지서버 URL 로 변환
	 * - 이미지가 저장되어 있는 서버를 직접 호출하지 않음
	 * - 웹서버를 통해 이미지를 조회하기 때문에 domain에 대한 내용을 작성할 필요 없음
	 * - 이미지가 저장된 경로만 return 해주기
	 */
	toImageServerUrl(url) {
		return `/image${url}`;
	},
};
