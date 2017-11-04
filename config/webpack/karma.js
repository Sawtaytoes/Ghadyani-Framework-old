const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin')
const HappyPack = require('happypack')
const webpack = require('webpack')

const dir = require(`${global.baseDir}directories`)
const config = require(`${dir.config}`)
const webpackDefaultConfig = require(`${dir.config}webpack/default`)

const threadPool = HappyPack.ThreadPool({ size: 4 })

const webpackConfig = {
	devtool: 'inline-source-map',
	node: { fs: 'empty' },
	plugins: [
		new webpack.ProgressPlugin((percentage, msg) => {
			!msg.includes('building modules') && console.info(Math.round(percentage * 100), `dev ${msg}`)
		}),
		new BellOnBundlerErrorPlugin(),
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
	],
}

module.exports = {
	...webpackDefaultConfig.getDev(),
	...webpackConfig,
}
