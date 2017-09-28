const dir = require(`${global.baseDir}globalDirs`)
const files = require(`${dir.includes}files`)

const shared = {
	cache: true,
	module: { rules: [{
		test: /\.js$/,
		loader: 'happypack/loader?id=js',
		include: [files],
	}, {
		test: /\.css$/,
		loader: 'happypack/loader?id=css',
	}, {
		test: /\.styl$/,
		loader: 'happypack/loader?id=styl',
		include: [files],
	}, {
		test: /\.html$/,
		loader: 'file-loader?name=[name].[ext]',
	}]},
	resolve: {
		extensions: ['.js', '.json', '.css', '.styl'],
		modules: [files, 'node_modules'],
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
