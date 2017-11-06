const getHttpServerConfig = require('scripts/server/develop/getHttpServerConfig')
const startHttpServer = require('scripts/server/develop/startHttpServer')
const startWebpackDevServer = require('scripts/server/develop/startWebpackDevServer')

module.exports = () => {
	startWebpackDevServer()
	startHttpServer(getHttpServerConfig())
}
