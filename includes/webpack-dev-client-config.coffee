BellOnBundlerErrorPlugin = require 'bell-on-bundler-error-plugin'
config = require __includes + 'config-settings'
HappyPack = require 'happypack'
paths = require __includes + 'paths'
webpack = require 'webpack'
webpackDefaultConfig = require __includes + 'webpack-default-config'

happyThreadPool = HappyPack.ThreadPool size: 4

webpackConfig =
	entry:
		main: [
			'webpack-dev-server/client?' + config.getServerUrl()
			'webpack/hot/dev-server'
			'./' + paths.code.src + 'client'
		]
		tests: [
			'webpack-dev-server/client?' + config.getServerUrl()
			'webpack/hot/dev-server'
			'./' + paths.code.src + 'tests'
		]
	externals:
		'react/addons': true
		'react/lib/ExecutionEnvironment': true
		'react/lib/ReactContext': true
	node: fs: 'empty'
	output:
		filename: '[name].bundle.js'
		chunkFilename: '[id].bundle.js'
		path: '/'
		pathinfo: true
		publicPath: '/'
	plugins: [
		new webpack.ProgressPlugin (percentage, msg) =>
			!msg.includes('build modules') and console.info Math.round(percentage * 100), "dev #{msg}"
		new webpack.IgnorePlugin /^\.\/locale$/, [/moment$/]
		new webpack.WatchIgnorePlugin [
			'./conf/'
			'./includes/'
			'./node_modules/'
			# './web/'
		]
		new BellOnBundlerErrorPlugin()
		new webpack.DefinePlugin 'process.env.NODE_ENV': JSON.stringify config.getEnv()
		new HappyPack
			id: 'jsx', threadPool: happyThreadPool, loaders: [
				'react-hot'
				'babel'
			]
		new HappyPack
			id: 'css', threadPool: happyThreadPool, loaders: [
				'isomorphic-style'
				'css'
				'postcss'
			]
		new HappyPack
			id: 'sass', threadPool: happyThreadPool, loaders: [
				'isomorphic-style'
				'css?sourceMap'
				'postcss?sourceMap'
				'sass?sourceMap'
			]
		new HappyPack
			id: 'styl', threadPool: happyThreadPool, loaders: [
				'isomorphic-style'
				'css'
				'postcss'
				'stylus?linenos=false'
			]
		new webpack.HotModuleReplacementPlugin()
		# new webpack.optimize.OccurenceOrderPlugin true
	]

module.exports = Object.assign {}, webpackDefaultConfig.getDev(), webpackConfig
