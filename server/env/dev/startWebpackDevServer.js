const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const config = require('config')
const webpackClientConfig = require('config/webpack/clientDev')
const webpackServerConfig = require('config/webpackDevServer')
const { onBuild } = require('server/utils/webpackBuildHelpers')

module.exports = () => (
	new WebpackDevServer(webpack(webpackClientConfig), webpackServerConfig)
	.listen(
		config.getPort(),
		config.getHostname(),
		onBuild('Webpack Dev Server', config.getServerUrl())
	)
)
