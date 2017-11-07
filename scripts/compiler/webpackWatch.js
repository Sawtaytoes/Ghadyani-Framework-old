const webpack = require('webpack')

const webpackClientConfig = require('config/webpack/clientDeploy')
const webpackServerConfig = require('config/webpack/serverDeploy')
const { onBuild, watchOptions } = require('scripts/utils/webpackBuildHelpers')

module.exports = () => {
	webpack([
		webpackServerConfig,
		webpackClientConfig
	])
	.watch(
		watchOptions,
		onBuild('webpack')
	)
}
