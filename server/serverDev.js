const bodyParser = require('body-parser')
const express = require('express')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

require('server/utils/loadBabelNodeConfig')()
const config = require('config')
const paths = require('server/utils/paths')
const webpackClientConfig = require('config/webpack/clientDev')
const webpackServerConfig = require('config/webpackDevServer')
const { onBuild } = require('server/utils/webpackBuildHelpers')

const sendEmail = (req, res) => {
	require('server/middleware/sendEmail')(req.body, res)
}

const loadTests = (req, res) => {
	res.send(require('src/renderers/renderTests.js')(req.params.testName))
}

const loadSite = (req, res) => {
	res.send(require('src/renderers/renderSite.js')(undefined, { pageMeta: {} }))
}

new WebpackDevServer(webpack(webpackClientConfig), webpackServerConfig)
.listen(config.getPort(), config.getHostname(), onBuild('webpackDevServer', config.getServerUrl()))

express()
.use(express.static(`${global.baseDir}${paths.root.dest}`, { redirect: false }))
.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: false }))

.get(config.getTestsPath(), loadTests)
.get(`${config.getTestsPath()}/:testName`, loadTests)
.post(config.getMailSendPath(), sendEmail)
.all('*', loadSite)

.listen(config.getProxyPort(), config.getProxyHostname(),
	onBuild('express-server', config.getProxyServerUrl())
)
