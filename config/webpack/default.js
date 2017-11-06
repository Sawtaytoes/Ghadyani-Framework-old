const path = require('path')

const paths = require('scripts/utils/paths')

const appFiles = path.join(paths.base, paths.app)

const shared = {
	cache: true,
	module: { rules: [{
		test: /\.js$/,
		loader: 'happypack/loader?id=js',
		include: [appFiles],
	}, {
		test: /\.css$/,
		loader: 'happypack/loader?id=css',
	}, {
		test: /\.styl$/,
		loader: 'happypack/loader?id=styl',
		include: [appFiles],
	}, {
		test: /\.html$/,
		loader: 'file-loader?name=[name].[ext]',
	}]},
	resolve: {
		extensions: ['.js', '.json', '.css', '.styl'],
		modules: [appFiles, 'node_modules'],
	},
}

const dev = {
	devtool: 'eval-source-map',
}

const prod = {
	devtool: false,
}

module.exports = {
	getDev: () => ({ ...shared, ...dev }),
	getProd: () => ({ ...shared, ...prod }),
}
