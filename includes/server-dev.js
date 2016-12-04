const bodyParser = require('body-parser')
const express = require('express')
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')

// Configs
const dir = require(`${global.baseDir}/global-dirs`)
const config = require(`${dir.includes}config-settings`)
const paths = require(`${dir.includes}paths`)
const webpackClientConfig = require(`${dir.webpack}webpack.config.client.dev`)
const webpackServerConfig = require(`${dir.webpack}webpack-dev-server.config`)

const onBuild = (taskName, getServerUrl, err) => {
	if (err) { console.error('webpack', err) }
	console.info(`[${taskName}]`, getServerUrl())
}

const sendEmail = (req, res) => {
	require(`${dir.services}send-email`)(req.body, res)
}

const loadTests = (req, res) => {
	res.end(require(`${global.baseDir}src/code/utilities/render-tests-page.jsx`)())
}

const loadSite = (req, res) => {
	res.end(require(`${global.baseDir}src/code/utilities/render-full-page.jsx`)(undefined, {
		locationChange: { title: req.originalUrl }
	}))
}

new webpackDevServer(webpack(webpackClientConfig), webpackServerConfig)
.listen(config.getPort(), config.getHostname(), onBuild.bind(null, 'webpack-dev-server', config.getServerUrl))

express()
.use(express.static(`${global.baseDir}${paths.code.dest}`, { redirect: false }))
.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: false }))

.get(config.getTestsPath(), loadTests)
.post(config.getMailSendPath(), sendEmail)
.all('*', loadSite)

.listen(config.getProxyPort(), config.getProxyHostname(),
	onBuild.bind(null, 'express-server', config.getProxyServerUrl)
)
