const IMAGE_SERVER_BASE_URI = process.env.VUE_APP_IMAGE_SERVER_URI;

const nullTypes = new Set([null, undefined, '']);
const PROTOCOL_TYPE = ['http', 'https'];
export default {
	/**
	 * 이미지서버 URL 로 변환
	 * - 이미지가 저장되어 있는 서버를 직접 호출하지 않음
	 * - 웹서버를 통해 이미지를 조회하기 때문에 domain에 대한 내용을 작성할 필요 없음
	 * - 이미지가 저장된 경로만 return 해주기
	 * >> 23.09.25 ( 월 )
	 * - 로컬의 경우 백엔드와 프론트 서버의 IP/PORT가 다름. 따라서 이미지를 가져오기 위해서는 이미지 서버역할을 하고 있는 로컬 백엔드 서버의 IP/PORT를 명시해줘야 함
	 */
	toImageServerUrl(url) {
		if (nullTypes.has(url)) {
			return '';
		}

		if (hasProtocol(url)) {
			return url;
		}

		return `${IMAGE_SERVER_BASE_URI}/image${url}`;
	},
};

function hasProtocol(url) {
	console.log(url);
	for (const protocol of PROTOCOL_TYPE) {
		if (url.startsWith(protocol)) {
			return true;
		}
	}
	return false;
}
