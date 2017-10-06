require('babel-core/register')({ presets: ['latest'] })

const bodyParser = require('body-parser')
const express = require('express')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

// Configs
const dir = require(`${global.baseDir}directories`)
const config = require(`${dir.configs}`)
const paths = require(`${dir.includes}paths`)
const webpackClientConfig = require(`${dir.configs}webpack/clientDev`)
const webpackServerConfig = require(`${dir.configs}webpackDevServer`)
const { onBuild } = require(`${dir.includes}webpackBuildHelpers`)

const sendEmail = (req, res) => {
	require(`${dir.services}sendEmail`)(req.body, res)
}

const loadTests = (req, res) => {
	res.end(require(`${global.baseDir}${paths.root.src}renderers/renderTests.js`)(req.params.testName))
}

const loadSite = (req, res) => {
	res.end(require(`${global.baseDir}${paths.root.src}renderers/renderSite.js`)(undefined, { pageMeta: {} }))
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
