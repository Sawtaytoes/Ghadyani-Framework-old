const CompressionPlugin = require('compression-webpack-plugin')
const HappyPack = require('happypack')
const webpack = require('webpack')

const dir = require(`${global.baseDir}directories`)
const config = require(`${dir.configs}`)
const paths = require(`${dir.includes}paths`)
const webpackDefaultConfig = require(`${dir.configs}webpack/default`)

const threadPool = HappyPack.ThreadPool({ size: 2 })

const webpackConfig = {
	entry: {
		main: `./${paths.root.src}client`,
		vendor: [
			'history/createBrowserHistory',
			'murmurhash-js',
			'react',
			'fbjs/lib/ExecutionEnvironment',
			'redux',
			'react-dom',
			'react-dom/server',
			'react-fastclick',
			// 'react-g-analytics',
			'react-redux',
			'react-router-dom',
			'react-router-redux',
		]
	},
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[id].bundle.js',
		path: `${global.baseDir}/web/`,
		pathinfo: false,
		publicPath: '/',
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			minimize: true,
		}),
		new webpack.ProgressPlugin((percentage, msg) => {
			console.info(Math.round(percentage * 100), `prod-client ${msg}`)
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
		new webpack.optimize.CommonsChunkPlugin({
			name: [
				'vendor',
				'manifest',
			],
		}),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.AggressiveMergingPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false },
			mangle: { except: ['$', 'exports', 'require'] },
			sourceMap: config.isDev(),
		}),
		new CompressionPlugin({
			algorithm: "gzip",
			asset: "[path].gz[query]",
			minRatio: 0.8,
			test: /\.js$/,
			threshold: 0,
		}),
	],
}

module.exports = {
	...webpackDefaultConfig.getProd(),
	...webpackConfig,
}
