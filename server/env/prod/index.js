const config = require('config')
const getHttpServerConfig = require('server/env/prod/getHttpServerConfig')
const getSecureHttpServerConfig = require('server/env/prod/getSecureHttpServerConfig')
const startHttpServer = require('server/env/prod/startHttpServer')

const httpServerConfig = getHttpServerConfig()

module.exports = () => {
	startHttpServer(
		config.isSecure()
		? getSecureHttpServerConfig(httpServerConfig)
		: httpServerConfig
	)
}
