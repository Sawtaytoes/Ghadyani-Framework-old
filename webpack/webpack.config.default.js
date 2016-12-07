const autoprefixer = require('autoprefixer')

// Configs
const dir = require(`${global.baseDir}/global-dirs`)
const files = require(`${dir.includes}files`)

const shared = {
	cache: true,
	module: { loaders: [{
		test: /\.jsx$/,
		loader: 'happypack/loader?id=jsx',
		include: [files.code],
	}, {
		test: /\.css$/,
		loader: 'happypack/loader?id=css',
	}, {
		test: /\.styl$/,
		loader: 'happypack/loader?id=styl',
		include: [files.styl],
	}, {
		test: /\.(jpe?g|png|gif|svg)$/i,
		loader: 'url?limit=10000',
	}, {
		test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
		loader: 'url?limit=10000&minetype=application/font-woff',
	}, {
		test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
		loader: 'file',
	}, {
		test: /\.html$|\.css$/,
		loader: 'file?name=[name].[ext]',
	}]},
	postcss: () => [
		autoprefixer({ browsers: ['last 4 versions', '> 5%'] })
	],
	resolve: {
		extensions: ['', '.js', '.jsx', '.json', '.css', '.styl'],
		root: [
			files.asset,
			files.code,
		],
	},
}

const dev = {
	colors: true,
	debug: true,
	devtool: 'eval-source-map',
	minimize: false,
	prerender: false,
}

const prod = {
	colors: false,
	debug: false,
	devtool: false,
	minimize: true,
	noInfo: true,
	prerender: true,
}

module.exports = {
	getDev: () => {
		const webpackDefaultConfig = Object.assign({}, shared, dev )
		webpackDefaultConfig.module.loaders.push({
			test: /\.json$/,
			loaders: [
				'json',
				'transform?brfs',
			]
		})

		return webpackDefaultConfig
	},
	getProd: () => Object.assign({}, shared, prod),
}
