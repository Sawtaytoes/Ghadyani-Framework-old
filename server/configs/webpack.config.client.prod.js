const CompressionPlugin = require('compression-webpack-plugin')
const HappyPack = require('happypack')
const webpack = require('webpack')

// Configs
const dir = require(`${global.baseDir}/global-dirs`)
const config = require(`${dir.configs}config-settings`)
const paths = require(`${dir.includes}paths`)
const webpackDefaultConfig = require(`${dir.configs}webpack.config.default`)

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
			'react-g-analytics',
			'react-hot-loader',
			'react-redux',
			'react-router',
			'react-router-redux',
		]
	},
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[id].bundle.js',
		path: './web/',
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
			// async: true,
			name: [
				'vendor',
				'manifest',
			],
		}),
		new webpack.optimize.AggressiveMergingPlugin(),
		// new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false },
			mangle: { except: ['$super', '$', 'exports', 'require'] },
			output: {
				comments: false,
				screw_ie8: true,
			},
			sourceMap: true,
		}),
		new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.js$/,
			threshold: 0,
			minRatio: 0.8
		}),
	],
}

module.exports = Object.assign({},
	webpackDefaultConfig.getProd(),
	webpackConfig
)
