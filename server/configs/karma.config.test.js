// Config Vars
const dir = require(`${global.baseDir}/global-dirs`)
const paths = require(`${dir.includes}paths`)
const webpackTestConfig = require(`${dir.configs}webpack.config.test`)

module.exports = config => config.set({
	autoWatch: true,
	autoWatchBatchDelay: 300,
	basePath: `${global.baseDir}`,
	browsers: ['PhantomJS'],
	colors: true,
	files: [{
		// pattern: `./${paths.root.src}**/*.test.jsx`,
		pattern: `./${paths.root.src}karma.jsx`,
		watched: false
	}],
	frameworks: ['tap'],
	logLevel: config.LOG_INFO,
	port: 9876,
	preprocessors: {
		// [`./${paths.root.src}**/*.test.jsx`]: [
		[`./${paths.root.src}karma.jsx`]: [
			'webpack',
			'sourcemap',
		],
	},
	reporters: [
		'tap-pretty',
	],
	tapReporter: {
		prettify: require('tap-spec'),
	},
	webpack: webpackTestConfig,
	webpackMiddleware: {
		noInfo: true,
		stats: 'errors-only',
	},
})
