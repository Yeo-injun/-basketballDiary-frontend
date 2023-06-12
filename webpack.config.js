import { DefinePlugin } from 'webpack';

module.exports = (env, argv) => {
	const mode = argv.mode || 'development';

	return {
		plugins: [
			new DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(mode),
			}),
		],
	};
};
