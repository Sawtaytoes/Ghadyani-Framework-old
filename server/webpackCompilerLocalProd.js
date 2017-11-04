const webpack = require('webpack')

const webpackClientConfig = require('config/webpack/clientProd')
const webpackServerConfig = require('config/webpack/serverProd')
const { onBuild } = require('server/utils/webpackBuildHelpers')

module.exports = () => {
	webpack(webpackClientConfig)
	.watch(100, onBuild('webpack-client'))

	webpack(webpackServerConfig)
	.watch(100, onBuild('webpack-server'))
}
