const bodyParser = require('body-parser')
const express = require('express')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const basePath = require('server/utils/basePath')
const config = require('config')
const paths = require('server/utils/paths')
const sendEmail = require('server/middleware/sendEmail')
const webpackClientConfig = require('config/webpack/clientDev')
const webpackServerConfig = require('config/webpackDevServer')
const { onBuild } = require('server/utils/webpackBuildHelpers')

require('server/utils/loadBabelNodeConfig')()

const loadTests = (req, res) => {
	const fileName = require.resolve(`${paths.root.src}renderers/renderTests.js`)

	delete require.cache[fileName]
	res.send(require(fileName)(req))
}

const loadSite = (req, res) => {
	const fileName = require.resolve(`${paths.root.src}renderers/renderSite.js`)

	delete require.cache[fileName]
	res.send(require(fileName)(undefined, { pageMeta: {} }))
}

new WebpackDevServer(webpack(webpackClientConfig), webpackServerConfig)
.listen(
	config.getPort(),
	config.getHostname(),
	onBuild('webpackDevServer', config.getServerUrl())
)

express()
.use(
	express.static(
		`${basePath}/${paths.root.dest}`,
		{ redirect: false }
	)
)

.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: false }))

.get(config.getTestsPath(), loadTests)
.get(`${config.getTestsPath()}/:testName`, loadTests)

.post(config.getMailSendPath(), sendEmail)

.all('*', loadSite)

.listen(
	config.getProxyPort(),
	config.getProxyHostname(),
	onBuild('express-server', config.getProxyServerUrl())
)
