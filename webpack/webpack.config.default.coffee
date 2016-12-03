autoprefixer = require 'autoprefixer'
path = require 'path'
paths = require __includes + 'paths'

p = (dir) ->
	path.join __base, dir

assetFiles = p paths.assets.src
codeFiles = p paths.code.src
fontFiles = p paths.assets.src + 'font/'
imgFiles = p paths.assets.src + 'img/'
sassFiles = p paths.assets.src + 'sass/'
stylFiles = p paths.assets.src + 'styl/'

shared =
	cache: true
	module: loaders: [
		test: /\.jsx$/
		loader: 'happypack/loader?id=jsx'
		include: [codeFiles]
	,
		test: /\.css$/
		loader: 'happypack/loader?id=css'
	,
		test: /\.s[ac]ss$/
		loader: 'happypack/loader?id=sass'
		include: [sassFiles, p(paths.npm.slickCarousel.src)]
	,
		test: /\.styl$/
		loader: 'happypack/loader?id=styl'
		include: [stylFiles]
	,
		test: /\.(jpe?g|png|gif|svg)$/i
		loaders: [
			'url?limit=10000'
		]
	,
		test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/
		loader: 'url?limit=10000&minetype=application/font-woff'
	,
		test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/
		loader: 'file'
	,
		test: /\.html$|\.css$/
		loader: 'file?name=[name].[ext]'
	]
	postcss: ->
		[autoprefixer browsers: ['last 4 versions', '> 5%']]
	resolve:
		extensions: ['', '.js', '.jsx', '.json', '.css', '.styl']
		root: [
			assetFiles
			codeFiles
		]

dev =
	colors: true
	debug: true
	devtool: 'eval-source-map'
	minimize: false
	prerender: false

prod =
	colors: false
	debug: false
	devtool: false
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
	noInfo: true
	prerender: true

module.exports =
	getDev: ->
		webpackDefaultConfig = Object.assign {}, shared, dev
		webpackDefaultConfig.module.loaders[4].loaders.push 'img?-minimize'

		webpackDefaultConfig.module.loaders.push
			test: /\.json$/
			loaders: [
				'json'
				'transform?brfs'
			]

		webpackDefaultConfig

	getProd: ->
		webpackDefaultConfig = Object.assign {}, shared, prod
		webpackDefaultConfig.module.loaders[4].loaders.push 'img?minimize'
		webpackDefaultConfig
