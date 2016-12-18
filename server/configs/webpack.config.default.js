// Configs
const dir = require(`${global.baseDir}/global-dirs`)
const files = require(`${dir.includes}files`)

const shared = {
	cache: true,
	module: { rules: [{
		test: /\.jsx$/,
		loader: 'happypack/loader?id=jsx',
		include: [files],
	}, {
		test: /\.css$/,
		loader: 'happypack/loader?id=css',
	}, {
		test: /\.styl$/,
		loader: 'happypack/loader?id=styl',
		include: [files],
	}, {
		test: /\.(jpe?g|png|gif|svg)$/i,
		loader: 'url?limit=10000',
	}, {
		test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
		loader: 'url-loader?limit=10000&minetype=application/font-woff',
	}, {
		test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
		loader: 'file-loader',
	}, {
		test: /\.html$|\.css$/,
		loader: 'file-loader?name=[name].[ext]',
	}]},
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.css', '.styl'],
		modules: [files, 'node_modules'],
	},
}

const dev = {
	// colors: true,
	// debug: true,
	devtool: 'eval-source-map',
	// minimize: false,
	// prerender: false,
}

const prod = {
	// colors: false,
	// debug: false,
	devtool: false,
	// minimize: true,
	// noInfo: true,
	// prerender: true,
}

module.exports = {
	getDev: () => {
		const webpackDefaultConfig = Object.assign({}, shared, dev )
		webpackDefaultConfig.module.rules.push({
			test: /\.json$/,
			loaders: [
				'json-loader',
				'transform-loader?brfs',
			]
		})

		return webpackDefaultConfig
	},
	getProd: () => Object.assign({}, shared, prod),
}
