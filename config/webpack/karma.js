const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin')
const HappyPack = require('happypack')
const os = require('os')
const webpack = require('webpack')

const config = require('config')
const webpackDefaultConfig = require('config/webpack/default')

const threadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const webpackConfig = {
	devtool: 'inline-source-map',
	node: { fs: 'empty' },
	plugins: [
		new webpack.ProgressPlugin((percentage, msg) => {
			!msg.includes('building modules')
			&& (
				console.info(
					Math.round(percentage * 100),
					`test ${msg}`
				)
			)
		}),
		new BellOnBundlerErrorPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(config.getEnv())
		}),
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
				'postcss-loader',
				'stylus-loader',
			]
		}),
	],
}

module.exports = {
	...webpackDefaultConfig.getDev(),
	...webpackConfig,
}
