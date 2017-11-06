const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin')
const HappyPack = require('happypack')
const os = require('os')
const webpack = require('webpack')

const config = require('config')
const paths = require('scripts/utils/paths')
const webpackDefaultConfig = require('config/webpack/default')

const threadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const webpackConfig = {
	entry: {
		main: [
			'react-hot-loader/patch',
			`webpack-dev-server/client?${config.getServerUrl()}`,
			'webpack/hot/dev-server',
			`./${paths.app}client`,
		],
		tests: [
			'react-hot-loader/patch',
			`webpack-dev-server/client?${config.getServerUrl()}`,
			'webpack/hot/dev-server',
			`./${paths.app}tests`,
		],
	},
	externals: {
		'react/addons': 'react',
		'react/lib/ExecutionEnvironment': 'react',
		'react/lib/ReactContext': 'react',
	},
	node: { fs: 'empty' },
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[id].bundle.js',
		path: '/',
		pathinfo: true,
		publicPath: '/',
	},
	performance: {
		hints: false,
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			debug: true
		}),
		new webpack.ProgressPlugin((percentage, msg) => {
			!msg.includes('building modules') && console.info(Math.round(percentage * 100), `dev ${msg}`)
		}),
		new BellOnBundlerErrorPlugin(),
		new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(config.getEnv()) }),
		new HappyPack({
			id: 'js', threadPool, loaders: [
				'babel-loader',
				'eslint-loader',
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
				'postcss-loader?sourceMap=inline',
				'stylus-loader?linenos=false',
			]
		}),
		new webpack.optimize.CommonsChunkPlugin({ name: ['manifest'] }),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
	],
}

module.exports = {
	...webpackDefaultConfig.getDev(),
	...webpackConfig,
}
