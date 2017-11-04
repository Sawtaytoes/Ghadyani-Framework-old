const getHttpServerConfig = require('server/env/dev/getHttpServerConfig')
const startHttpServer = require('server/env/dev/startHttpServer')
const startWebpackDevServer = require('server/env/dev/startWebpackDevServer')

module.exports = () => {
	startWebpackDevServer()
	startHttpServer(getHttpServerConfig())
}
