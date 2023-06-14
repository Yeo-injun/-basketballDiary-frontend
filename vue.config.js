const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
	transpileDependencies: ['vuetify'],
	configureWebpack: {
		devtool: 'source-map',
	},
	/**----------------------------------------
	 * 2023.06.08 이슈확인
	 * publicPath가 활성화되어있을 경우 local에서 실행시 새로고침 이슈 발생
	 * 링크 참조 : https://pinokio0702.tistory.com/290
	 * 해당 속성은 firebase배포시 빌드 상대경로로 변경하기 위해 설정해준 것.
	 * firebase를 걷어낼 예정이니 해당 속성을 어떻게 적용할지 고민 필요
	 */
	publicPath: process.env.NODE_ENV === 'production' ? '/' : undefined,
});
