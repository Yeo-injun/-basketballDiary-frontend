import axios from 'axios';
import router from '@/router';

import HttpHeaderUtil from '@/http/util/HttpHeaderUtil';
import HttpBodyUtil from '@/http/util/HttpBodyUtil';
import LoadingStateManager from '@/common/state/LoadingStateManager';
import AuthStateManager from '@/common/state/AuthStateManager';

// 인터셉터 참고자료 : https://yamoo9.github.io/axios/guide/interceptors.html
// https://velog.io/@skyepodium/axios-%EC%9D%B8%ED%84%B0%EC%85%89%ED%84%B0%EB%A1%9C-API-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0
// CORS처리 필요 : https://inpa.tistory.com/entry/AXIOS-%F0%9F%93%9A-CORS-%EC%BF%A0%ED%82%A4-%EC%A0%84%EC%86%A1withCredentials-%EC%98%B5%EC%85%98
// 참고자료 : https://jess2.xyz/vue/vue-tip/#2-router--%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%84%A4%EA%B3%84
/**
 * request에 cookie값이 세팅되지 않는 이유 : CORS + sameSite속성의 기본값 떄문에
 * CORS일 경우 백엔드와 프론트에서 각각 설정을 추가해줘야 함. withCredential = true
 * samsSite설정은 백엔드에서 cookie생성시 설정 : 웹서버 설정을 변경하거나, cookie생성시 설정을 추가해서 생성해주기
 */

const ERROR_CODE = {
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	NOT_FOUND: 404,
	CONFLICT: 409,
	INTERNAL_SERVER_ERROR: 500,
};

const API_SERVER_BASE_URI = process.env.VUE_APP_API_URI;
// const IMAGE_SERVER_BASE_URI = process.env.VUE_APP_IMAGE_SERVER_URI;
export default {
	// 실행모드에 따라 환경변수 동적으로 반영하기
	// 참고자료 : https://velog.io/@skyepodium/vue-%EC%8B%A4%ED%96%89-%EB%AA%A8%EB%93%9C%EC%99%80-%ED%99%98%EA%B2%BD-%EB%B3%80%EC%88%98-%EC%84%A4%EC%A0%95
	// .env환경변수 파일 만들기, 실행모드 스크립트 작성하기 -> package.json
	createAxiosInstance(apiUrl) {
		const axiosInstance = axios.create({
			baseURL: `${API_SERVER_BASE_URI}${apiUrl}`,
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json',
			},
		});

		// Request 인터셉터 등록
		axiosInstance.interceptors.request.use(function (config) {
			const method = config.method.toUpperCase();
			const targetUrl = `${config.baseURL}${config.url}`;
			console.log(`${method} / ${targetUrl}`);
			LoadingStateManager.mutations.loadingStart();
			return config;
		});
		// Response 인터셉터 등록
		axiosInstance.interceptors.response.use(
			function (response) {
				LoadingStateManager.mutations.loadingEnd();
				return response;
			},
			function (error) {
				LoadingStateManager.mutations.loadingEnd();
				/** Promise.reject() return의 효과
				 *  에러를 API를 호출한 Axios에게 넘겨줌 - API를 호출한 곳에서 try ~ catch문으로 예외처리
				 **/
				console.log('======= 인터셉터 진입 : 에러 발생 =======');
				const isNotConectNetwork = typeof error.response == 'undefined';
				if (isNotConectNetwork) {
					alert('네트워크 연결이 불안정합니다. 네트워크 상태를 확인해주세요.');
					return Promise.reject(error);
				}

				// 예외에 따라 메세지 알림창 호출
				const errorMessage = error.response.data.message;
				alert(errorMessage);

				const statusCode = error.response.status;
				const errorCodeName = error.response.data.code;
				routeErrorPage(statusCode, errorCodeName);
				return Promise.reject(error);
			}
		);

		// POST 호출 ( ContentType : multipart인 경우 )
		axiosInstance.postWithMultipart = function (url, msg) {
			return axiosInstance.post(
				url,
				HttpBodyUtil.toFormData(msg),
				HttpHeaderUtil.createMultipartHeader()
			);
		};
		return axiosInstance;
	},
};

function routeErrorPage(responseStutsCode, errorCodeName) {
	let errorPagePath = '/error';
	switch (responseStutsCode) {
		case ERROR_CODE.UNAUTHORIZED:
			if (errorCodeName == 'UNAUTHORIZED_ACCESS') {
				break;
			}
			AuthStateManager.mutations.processLogout();
			errorPagePath = '/login';
			router.push(errorPagePath);
			break;
	}
}
