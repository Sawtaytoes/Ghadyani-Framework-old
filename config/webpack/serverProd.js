const HappyPack = require('happypack')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')

const dir = require(`${global.baseDir}directories`)
const config = require(`${dir.config}`)
const paths = require(`${dir.includes}paths`)
const webpackDefaultConfig = require(`${dir.config}webpack/default`)

const threadPool = HappyPack.ThreadPool({ size: 2 })

const webpackConfig = {
	entry: `./${paths.root.src}server`,
	externals: [
		nodeExternals({
			whitelist: [/.*\.css/]
		})
	],
	output: {
		filename: 'backend.js',
		libraryTarget: 'commonjs2',
		path: `${global.baseDir}/web/`,
		pathinfo: false,
		publicPath: '/',
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			minimize: true,
		}),
		new webpack.ProgressPlugin((percentage, msg) => {
			console.info(Math.round(percentage * 100), `prod-server ${msg}`)
		}),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
		new webpack.WatchIgnorePlugin([
			'./.happypack/',
			'./cert/',
			'./node_modules/',
			'./server/',
		]),
		new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(config.getEnv()) }),
		new HappyPack({
			id: 'js', threadPool, loaders: [
				'babel-loader',
			]
		}),
		new HappyPack({
			id: 'css', threadPool, loaders: [
				'isomorphic-style-loader',
				'css-loader',
				'postcss-loader',
			]
		}),
		new HappyPack({
			id: 'styl', threadPool, loaders: [
				'isomorphic-style-loader',
				'css-loader',
				'postcss-loader',
				'stylus-loader?linenos=false&compress=true',
			]
		}),
		new webpack.optimize.CommonsChunkPlugin({ async: true }),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.AggressiveMergingPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false },
			mangle: { except: ['$', 'exports', 'require'] },
			sourceMap: config.isDev(),
		}),
	],
	target: 'node',
}

module.exports = {
	...webpackDefaultConfig.getProd(),
	...webpackConfig,
}
