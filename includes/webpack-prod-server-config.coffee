config = require __includes + 'config-settings'
HappyPack = require 'happypack'
paths = require __includes + 'paths'
webpack = require 'webpack'
webpackDefaultConfig = require __includes + 'webpack-default-config'

entryFile = './' + paths.code.src + 'server'
happyThreadPool = HappyPack.ThreadPool size: 2

webpackConfig =
	entry: main: entryFile
	output:
		filename: '[name].backend.js'
		chunkFilename: '[id].backend.js'
		libraryTarget: 'commonjs2'
		path: './web/'
		pathinfo: false
		publicPath: '/'
	plugins: [
		new webpack.ProgressPlugin (percentage, msg) =>
			console.info Math.round(percentage * 100), msg
		new webpack.NoErrorsPlugin()
		new webpack.IgnorePlugin /^\.\/locale$/, [/moment$/]
		new webpack.WatchIgnorePlugin [
			'./conf/'
			'./includes/'
			'./node_modules/'
			# './web/'
		]
		new webpack.DefinePlugin 'process.env.NODE_ENV': JSON.stringify config.getEnv()
		new HappyPack
			id: 'jsx', threadPool: happyThreadPool, loaders: [
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
				'css'
				'postcss'
				'sass?compress=true'
			]
		new HappyPack
			id: 'styl', threadPool: happyThreadPool, loaders: [
				'isomorphic-style'
				'css'
				'postcss'
				'stylus?linenos=false&compress=true'
			]
		new webpack.optimize.OccurenceOrderPlugin true
		new webpack.optimize.CommonsChunkPlugin async: true
		new webpack.optimize.AggressiveMergingPlugin()
		new webpack.optimize.DedupePlugin()
		new webpack.optimize.UglifyJsPlugin
			compress: warnings: false
			mangle: except: ['$super', '$', 'exports', 'require']
			output:
				comments: false
				screw_ie8: true
	]
	target: 'node'

module.exports = Object.assign {}, webpackDefaultConfig.getProd(), webpackConfig
