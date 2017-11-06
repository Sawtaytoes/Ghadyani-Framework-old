const config = require('config')
const getHttpServerConfig = require('scripts/server/deploy/getHttpServerConfig')
const getSecureHttpServerConfig = require('scripts/server/deploy/getSecureHttpServerConfig')
const startHttpServer = require('scripts/server/deploy/startHttpServer')

const httpServerConfig = getHttpServerConfig()

module.exports = () => {
	startHttpServer(
		config.isSecure()
		? getSecureHttpServerConfig(httpServerConfig)
		: httpServerConfig
	)
}
