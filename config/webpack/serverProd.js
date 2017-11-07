const HappyPack = require('happypack')
const nodeExternals = require('webpack-node-externals')
const os = require('os')
const webpack = require('webpack')

const config = require('config')
const paths = require('scripts/utils/paths')
const webpackDefaultConfig = require('config/webpack/default')

const threadPool = HappyPack.ThreadPool({ size: os.cpus().length / 2 })

const webpackConfig = {
	entry: `./${paths.app}server`,
	externals: [
		nodeExternals({
			whitelist: [/.*\.css/]
		})
	],
	output: {
		filename: 'backend.js',
		libraryTarget: 'commonjs2',
		path: `${paths.base}/${paths.bundle}`,
		pathinfo: false,
		publicPath: '/',
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			minimize: true,
		}),
		new webpack.ProgressPlugin((percentage, msg) => {
			console.info(
				Math.round(percentage * 100),
				`prod-server ${msg}`
			)
		}),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(config.getEnv())
		}),
		new HappyPack({
			id: 'js', threadPool, loaders: [
				'babel-loader?cacheDirectory=true',
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
			cache: true,
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
