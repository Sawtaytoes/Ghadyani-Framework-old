const webpack = require('webpack')

const webpackClientConfig = require('config/webpack/clientDeploy')
const webpackServerConfig = require('config/webpack/serverDeploy')
const { onBuild } = require('scripts/utils/webpackBuildHelpers')

module.exports = () => {
	webpack(
		[
			webpackServerConfig,
			webpackClientConfig
		],
		onBuild('webpack-client')
	)
}
