const webpack = require('webpack')

const serverRunMode = require('server/includes/serverRunMode')
const webpackClientConfig = require('config/webpack/clientProd')
const webpackServerConfig = require('config/webpack/serverProd')
const { onBuild } = require('server/includes/webpackBuildHelpers')

module.exports = () => {
	if (serverRunMode.isLocalProductionTesting) {
		// We're running a dev build so watch files for changes
		webpack(webpackClientConfig)
		.watch(100, onBuild('webpack-client'))

		webpack(webpackServerConfig)
		.watch(100, onBuild('webpack-server'))

	} else {
		webpack(webpackClientConfig, onBuild('webpack-client'))
		webpack(webpackServerConfig, onBuild('webpack-server'))
	}
}
