const webpack = require('webpack')

const webpackClientConfig = require('config/webpack/clientProd')
const webpackServerConfig = require('config/webpack/serverProd')
const { onBuild } = require('server/utils/webpackBuildHelpers')

module.exports = () => {
	webpack(webpackClientConfig, onBuild('webpack-client'))
	webpack(webpackServerConfig, onBuild('webpack-server'))
}
