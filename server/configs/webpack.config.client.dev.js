const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin')
const HappyPack = require('happypack')
const webpack = require('webpack')

// Configs
const dir = require(`${global.baseDir}/global-dirs`)
const config = require(`${dir.configs}config-settings`)
const paths = require(`${dir.includes}paths`)
const webpackDefaultConfig = require(`${dir.configs}webpack.config.default`)

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
				'postcss-loader',
				'stylus-loader?linenos=false',
			]
		}),
		new webpack.optimize.CommonsChunkPlugin({ name: ['manifest'] }),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
	]
}

module.exports = Object.assign({},
	webpackDefaultConfig.getDev(),
	webpackConfig
)
