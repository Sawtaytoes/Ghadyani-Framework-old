const config = require('config')
const { onBuild } = require('server/utils/webpackBuildHelpers')

module.exports = httpServerConfig => (
	httpServerConfig
	.listen(
		config.getProxyPort(),
		config.getProxyHostname(),
		onBuild('Express Server', config.getProxyServerUrl())
	)
)
