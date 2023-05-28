const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
	transpileDependencies: ['vuetify'],
	configureWebpack: {
		devtool: 'source-map',
	},
	// 빌드시 상대경로로 변경하기 위함
	publicPath: '',
});
