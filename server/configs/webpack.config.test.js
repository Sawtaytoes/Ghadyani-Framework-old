const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin')
const HappyPack = require('happypack')
const webpack = require('webpack')

// Configs
const dir = require(`${global.baseDir}/global-dirs`)
const config = require(`${dir.configs}config-settings`)
const webpackDefaultConfig = require(`${dir.configs}webpack.config.default`)

const threadPool = HappyPack.ThreadPool({ size: 4 })

const webpackConfig = {
	// devtool: 'inline-source-map',
	devtool: 'cheap-module-source-map',
	node: { fs: 'empty' },
	plugins: [
		new webpack.ProgressPlugin((percentage, msg) => {
			!msg.includes('building modules') && console.info(Math.round(percentage * 100), `dev ${msg}`)
		}),
		new BellOnBundlerErrorPlugin(),
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
				'stylus-loader?linenos=false&compress=true',
			]
		}),
	],
}

module.exports = Object.assign({},
	webpackDefaultConfig.getDev(),
	webpackConfig
)
