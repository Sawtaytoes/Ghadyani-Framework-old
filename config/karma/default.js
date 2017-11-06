const paths = require('server/utils/paths')
const webpackKarmaConfig = require('config/webpack/karma')

const karmaDefaultConfig = karmaConfig => ({
	basePath: paths.base,
	browsers: ['ChromeHeadless'],
	colors: true,
	files: [{
		pattern: `./${paths.src}karma.js`,
		watched: false,
	}],
	frameworks: ['tap'],
	logLevel: karmaConfig.LOG_ERROR,
	port: 9876,
	preprocessors: {
		[`./${paths.src}karma.js`]: [
			'webpack',
			'sourcemap',
		],
	},
	reporters: ['tap-pretty'],
	tapReporter: {
		prettify: require('tap-spec'),
	},
	webpack: webpackKarmaConfig,
	webpackMiddleware: {
		noInfo: true,
		stats: 'errors-only',
	},
})

module.exports = karmaDefaultConfig
