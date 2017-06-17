require('babel-core/register')({ presets: ['latest'] })

const bodyParser = require('body-parser')
const express = require('express')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

// Configs
const dir = require(`${global.baseDir}/global-dirs`)
const config = require(`${dir.configs}config-settings`)
const paths = require(`${dir.includes}paths`)
const webpackClientConfig = require(`${dir.configs}webpack.config.client.dev`)
const webpackServerConfig = require(`${dir.configs}webpack-dev-server.config`)
const { onBuild } = require(`${dir.includes}webpack-build-helpers`)

const sendEmail = (req, res) => {
	require(`${dir.services}send-email`)(req.body, res)
}

const loadTests = (req, res) => {
	res.end(require(`${global.baseDir}${paths.root.src}utils/render-tests-page.jsx`)(req.params.testName))
}

const loadSite = (req, res) => {
	res.end(require(`${global.baseDir}${paths.root.src}utils/render-full-page.jsx`)(undefined, {
		pageMeta: { title: req.url }
	}))
}

new WebpackDevServer(webpack(webpackClientConfig), webpackServerConfig)
.listen(config.getPort(), config.getHostname(), onBuild('webpack-dev-server', config.getServerUrl()))

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
