bodyParser = require 'body-parser'
config = require __includes + 'config-settings'
express = require 'express'
paths = require __includes + 'paths'

webpack = require 'webpack'
webpackDevServer = require 'webpack-dev-server'

webpackClientConfig = require __webpack + 'webpack.config.client.dev'
webpackServerConfig = require __webpack + 'webpack-dev-server.config'

onBuild = (taskName, getServerUrl, err, stats) ->
	throw (console.error)('webpack', err) if err
	console.info "[#{taskName}]", getServerUrl()

sendEmail = (req, res) ->
	require(__services + 'send-email')(req.body, res)

loadTests = (req, res) ->
	res.end require(__base + 'src/code/utilities/render-tests-page.jsx')()

loadSite = (req, res) ->
	res.end require(__base + 'src/code/utilities/render-full-page.jsx') undefined,
		locationChange: title: req.originalUrl

module.exports = do ->
	new webpackDevServer webpack(webpackClientConfig), webpackServerConfig
	.listen config.getPort(), config.getHostname(), onBuild.bind null, 'webpack-dev-server', config.getServerUrl

	express()
	.use express.static __base + paths.code.dest, redirect: false
	.use bodyParser.json()
	.use bodyParser.urlencoded extended: false

	.get config.getTestsPath(), loadTests
	.post config.getMailSendPath(), sendEmail
	.all '*', loadSite

	.listen config.getProxyPort(), config.getProxyHostname(), onBuild.bind null, 'express-server', config.getProxyServerUrl
