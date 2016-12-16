const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin')
const HappyPack = require('happypack')
const webpack = require('webpack')

// Configs
const dir = require(`${global.baseDir}/global-dirs`)
const config = require(`${dir.includes}config-settings`)
const paths = require(`${dir.includes}paths`)
const webpackDefaultConfig = require(`${dir.webpack}webpack.config.default`)

const threadPool = HappyPack.ThreadPool({ size: 4 })

const webpackConfig = {
	entry: {
		main: [
			'react-hot-loader/patch',
			`webpack-dev-server/client?${config.getServerUrl()}`,
			'webpack/hot/dev-server',
			`./${paths.root.src}client`,
		],
		tests: [
			'react-hot-loader/patch',
			`webpack-dev-server/client?${config.getServerUrl()}`,
			'webpack/hot/dev-server',
			`./${paths.root.src}tests`,
		],
	},
	externals: {
		'react/addons': true,
		'react/lib/ExecutionEnvironment': true,
		'react/lib/ReactContext': true,
	},
	node: { fs: 'empty' },
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[id].bundle.js',
		path: '/',
		pathinfo: true,
		publicPath: '/',
	},
	plugins: [
		new webpack.ProgressPlugin((percentage, msg) => {
			!msg.includes('build modules') && console.info(Math.round(percentage * 100), `dev ${msg}`)
		}),
		new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
		new webpack.WatchIgnorePlugin([
			'./conf/',
			'./includes/',
			'./node_modules/',
			'./services/',
			'./webpack/',
		]),
		new BellOnBundlerErrorPlugin(),
		new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(config.getEnv()) }),
		new HappyPack({
			id: 'jsx', threadPool, loaders: [
				'react-hot-loader/webpack',
				'babel',
				'eslint',
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
				'stylus?linenos=false',
			]
		}),
		new webpack.HotModuleReplacementPlugin(),
	]
}

module.exports = Object.assign({},
	webpackDefaultConfig.getDev(),
	webpackConfig
)
