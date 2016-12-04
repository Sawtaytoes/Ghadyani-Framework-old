const HappyPack = require('happypack')
const webpack = require('webpack')

// Configs
const dir = require(`${global.baseDir}/global-dirs`)
const config = require(`${dir.includes}config-settings`)
const paths = require(`${dir.includes}paths`)
const webpackDefaultConfig = require(`${dir.webpack}webpack.config.default`)

const threadPool = HappyPack.ThreadPool({ size: 2 })

const webpackConfig = {
	entry: `./${paths.code.src}server`,
	output: {
		filename: 'backend.js',
		libraryTarget: 'commonjs2',
		path: './web/',
		pathinfo: false,
		publicPath: '/',
	},
	plugins: [
		new webpack.ProgressPlugin((percentage, msg) => {
			console.info(Math.round(percentage * 100), `dev ${msg}`)
		}),
		new webpack.NoErrorsPlugin(),
		new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
		new webpack.WatchIgnorePlugin([
			'./conf/',
			'./includes/',
			'./node_modules/',
			'./services/',
			'./webpack/',
		]),
		new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(config.getEnv()) }),
		new HappyPack({
			id: 'jsx', threadPool, loaders: [
				'babel',
			]
		}),
		new HappyPack({
			id: 'css', threadPool, loaders: [
				'isomorphic-style',
				'css',
				'postcss',
			]
		}),
		new HappyPack({
			id: 'styl', threadPool, loaders: [
				'isomorphic-style',
				'css',
				'postcss',
				'stylus?linenos=false&compress=true',
			]
		}),
		new webpack.optimize.OccurenceOrderPlugin(true),
		new webpack.optimize.CommonsChunkPlugin({ async: true }),
		new webpack.optimize.AggressiveMergingPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false },
			mangle: { except: ['$super', '$', 'exports', 'require'] },
			output: {
				comments: false,
				screw_ie8: true,
			},
		}),
	],
	target: 'node',
}

module.exports = Object.assign({},
	webpackDefaultConfig.getProd(),
	webpackConfig
)
