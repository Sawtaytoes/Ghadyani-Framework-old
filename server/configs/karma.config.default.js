// Config Vars
const dir = require(`${global.baseDir}globalDirs`)
const paths = require(`${dir.includes}paths`)
const webpackKarmaConfig = require(`${dir.configs}webpack.config.karma`)

const karmaDefaultConfig = config => ({
	basePath: `${global.baseDir}`,
	browsers: ['PhantomJS'],
	colors: true,
	files: [
		`${paths.nodeModules}phantomjs-polyfill-find/find-polyfill.js`,
		`${paths.nodeModules}phantomjs-polyfill-string-includes.js`,
		{
			pattern: `./${paths.root.src}karma.js`,
			watched: false,
		}
	],
	frameworks: ['tap'],
	logLevel: config.LOG_INFO,
	port: 9876,
	preprocessors: {
		[`./${paths.root.src}karma.js`]: [
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
	webpack: webpackKarmaConfig,
	webpackMiddleware: {
		noInfo: true,
		stats: 'errors-only',
	},
})

module.exports = karmaDefaultConfig
