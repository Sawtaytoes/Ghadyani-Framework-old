autoprefixer = require 'autoprefixer'
BellOnBundlerErrorPlugin = require 'bell-on-bundler-error-plugin'
config = require __includes + 'config-settings'
path = require 'path'
paths = require __includes + 'paths'
webpack = require 'webpack'

entryFile = './' + paths.code.src + 'client'

p = (dir) ->
	path.join __base, dir

codeFiles = p paths.code.src
fontFiles = p paths.assets.src + 'font/'
imgFiles = p paths.assets.src + 'img/'
sassFiles = p paths.assets.src + 'sass/'
stylFiles = p paths.assets.src + 'styl/'

module.exports =
	cache: true
	colors: true
	debug: true
	devtool: 'eval-source-map'
	entry: [
		'webpack-dev-server/client?' + config.getServerUrl()
		'webpack/hot/dev-server'
		entryFile
	]
	minimize: false
	module:
		loaders: [
			test: /\.jsx$/
			loaders: [
				'react-hot'
				'babel'
			]
			include: [codeFiles]
		,
			test: /\.cjsx$/
			loaders: [
				'react-hot'
				'babel'
				'coffee'
				'cjsx'
			]
			include: [codeFiles]
		,
			test: /\.css$/
			loaders: [
				'isomorphic-style'
				'css'
				'postcss'
			]
			# include: [p(paths.npm.normalize.src)]
		,
			test: /\.s[ac]ss$/
			loaders: [
				'isomorphic-style'
				'css?sourceMap'
				'postcss?sourceMap'
				'sass?sourceMap'
			]
			include: [sassFiles, p(paths.npm.slickCarousel.src)]
		,
			test: /\.styl$/
			loaders: [
				'isomorphic-style'
				'css'
				'postcss'
				'stylus?linenos=false'
			]
			include: [stylFiles]
		,
			test: /\.(jpe?g|png|gif|svg)$/i,
			loaders: [
				'url?limit=10000'
				'img?-minimize'
			]
			# include: [imgFiles]
		,
			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: 'url-loader?limit=10000&minetype=application/font-woff'
			# include: [fontFiles]
		,
			test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: 'file-loader'
			# include: [fontFiles]
		]
	output:
		filename: 'bundle.js'
		path: '/'
		pathinfo: true
		publicPath: '/'
	plugins: [
		new BellOnBundlerErrorPlugin()
		new webpack.DefinePlugin 'process.env.NODE_ENV': JSON.stringify config.getEnv()
		new webpack.HotModuleReplacementPlugin()
		new webpack.IgnorePlugin /^\.\/locale$/, [/moment$/]
		# new webpack.optimize.OccurenceOrderPlugin true
		new webpack.ProgressPlugin (percentage, msg) => console.info parseInt(percentage * 100, 10), msg
		new webpack.ProvidePlugin __DEV__: true
		new webpack.WatchIgnorePlugin [
			'./conf/'
			'./includes/'
			'./node_modules/'
			# './web/'
		]
	]
	postcss: ->
		[autoprefixer browsers: ['last 4 versions', '> 5%']]
	prerender: false
	resolve:
		extensions: ['', '.js', '.jsx', '.cjsx', '.css', '.styl']
		root: [
			p 'src/assets'
			p 'src/code'
		]
