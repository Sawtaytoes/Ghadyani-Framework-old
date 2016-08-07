autoprefixer = require 'autoprefixer'
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
	colors: false
	debug: false
	devtool: false
	entry: entryFile
	imagemin:
		gifsicle: interlaced: false
		jpegtran:
			progressive: true
			arithmetic: false
		pngquant:
			floyd: 0.5
			speed: 2
		svgo: plugins: [removeTitle: true, convertPathData: false]
	minimize: true
	module:
		loaders: [
			test: /\.jsx$/
			loaders: [
				'babel'
			]
			include: [codeFiles]
		,
			test: /\.cjsx$/
			loaders: [
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
				'css'
				'postcss'
				'sass?compress=true'
			]
			include: [sassFiles, p(paths.npm.slickCarousel.src)]
		,
			test: /\.styl$/
			loaders: [
				'isomorphic-style'
				'css'
				'postcss'
				'stylus?linenos=false&compress=true'
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
	noInfo: true
	output:
		filename: 'bundle.js'
		path: './web/'
		pathinfo: false
		publicPath: '/'
	plugins: [
		new webpack.DefinePlugin 'process.env.NODE_ENV': JSON.stringify config.getEnv()
		new webpack.IgnorePlugin /^\.\/locale$/, [/moment$/]
		new webpack.NoErrorsPlugin()
		new webpack.optimize.AggressiveMergingPlugin()
		new webpack.optimize.CommonsChunkPlugin async: true
		new webpack.optimize.DedupePlugin()
		new webpack.optimize.OccurenceOrderPlugin true
		new webpack.optimize.UglifyJsPlugin
			compress: warnings: false
			mangle: except: ['$super', '$', 'exports', 'require']
			output:
				comments: false
				screw_ie8: true
		new webpack.ProgressPlugin (percentage, msg) => console.info parseInt(percentage * 100, 10), msg
		new webpack.WatchIgnorePlugin [
			'./conf/'
			'./includes/'
			'./node_modules/'
			# './web/'
		]
	]
	postcss: ->
		[autoprefixer browsers: ['last 4 versions', '> 5%']]
	prerender: true
	resolve:
		extensions: ['', '.js', '.jsx', '.cjsx', '.css', '.styl']
		root: [
			p 'src/assets'
			p 'src/code'
		]
