BellOnBundlerErrorPlugin = require 'bell-on-bundler-error-plugin'
config = require __includes + 'config-settings'
HappyPack = require 'happypack'
paths = require __includes + 'paths'
webpack = require 'webpack'
webpackDefaultConfig = require __includes + 'webpack-default-config'
console.log webpackDefaultConfig

entryFile = './' + paths.code.src + 'client'
happyThreadPool = HappyPack.ThreadPool size: 4

webpackConfig =
	entry: [
		'webpack-dev-server/client?' + config.getServerUrl()
		'webpack/hot/dev-server'
		entryFile
	]
	output:
		filename: 'bundle.js'
		path: '/'
		pathinfo: true
		publicPath: '/'
	plugins: [
		new webpack.ProgressPlugin (percentage, msg) => msg.search('build modules') == -1 and console.info parseInt(percentage * 100, 10), msg
		new webpack.IgnorePlugin /^\.\/locale$/, [/moment$/]
		new webpack.WatchIgnorePlugin [
			'./conf/'
			'./includes/'
			'./node_modules/'
			# './web/'
		]
		new BellOnBundlerErrorPlugin()
		new webpack.ProvidePlugin __DEV__: true
		new webpack.DefinePlugin 'process.env.NODE_ENV': JSON.stringify config.getEnv()
		new HappyPack
			id: 'jsx', threadPool: happyThreadPool, loaders: [
				'react-hot'
				'babel'
			]
		new HappyPack
			id: 'cjsx', threadPool: happyThreadPool, loaders: [
				'react-hot'
				'babel'
				'coffee'
				'cjsx'
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
