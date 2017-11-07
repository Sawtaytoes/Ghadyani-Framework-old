const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const config = require('config')
const webpackClientConfig = require('config/webpack/clientDevelop')
const webpackServerConfig = require('config/webpackDevServer')
const { onBuild } = require('scripts/utils/webpackBuildHelpers')

module.exports = () => (
	new WebpackDevServer(webpack(webpackClientConfig), webpackServerConfig)
	.listen(
		config.getPort(),
		config.getHostname(),
		onBuild('Webpack Dev Server', config.getServerUrl())
	)
)
