const HappyPack = require('happypack')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')

// Configs
const dir = require(`${global.baseDir}globalDirs`)
const config = require(`${dir.configs}configSettings`)
const paths = require(`${dir.includes}paths`)
const webpackDefaultConfig = require(`${dir.configs}webpack.config.default`)

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
			'./conf/',
			'./includes/',
			'./node_modules/',
			'./services/',
			'./webpack/',
		]),
		new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(config.getEnv()) }),
		new HappyPack({
			id: 'js', threadPool, loaders: [
				'babel-loader?presets[]=latest,presets[]=stage-0,presets[]=react',
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
			mangle: { except: ['$super', '$', 'exports', 'require'] },
			output: {
				comments: false,
				screw_ie8: true,
			},
			sourceMap: config.isDev(),
		}),
	],
	target: 'node',
}

module.exports = Object.assign({},
	webpackDefaultConfig.getProd(),
	webpackConfig
)
