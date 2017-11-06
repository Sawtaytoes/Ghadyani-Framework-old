const webpack = require('webpack')

const webpackClientConfig = require('config/webpack/clientProd')
const webpackServerConfig = require('config/webpack/serverProd')
const { onBuild, watchOptions } = require('server/utils/webpackBuildHelpers')

module.exports = () => {
	webpack(webpackClientConfig)
	.watch(watchOptions, onBuild('webpack-client'))

	webpack(webpackServerConfig)
	.watch(watchOptions, onBuild('webpack-server'))
}
