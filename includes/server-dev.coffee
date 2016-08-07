bodyParser = require 'body-parser'
config = require __includes + 'config-settings'
express = require 'express'
paths = require __includes + 'paths'

webpack = require 'webpack'
webpackDevServer = require 'webpack-dev-server'

webpackClientConfig = require __includes + 'webpack-dev-client-config'
webpackServerConfig = require __includes + 'webpack-dev-server-config'

onBuild = (taskName, err, stats) ->
	throw (console.error)('webpack', err) if err
	console.info taskName, config.getServerUrl()

sendEmail = (req, res) ->
	require(__includes + 'send-email')(req.body, res)

loadSite = (req, res) ->
	res.end require(__base + 'src/code/utilities/render-full-page.jsx') undefined,
		locationChange: title: req.originalUrl

module.exports = do ->
	new webpackDevServer webpack(webpackClientConfig), webpackServerConfig
		.listen config.getPort(), config.getHostname(), onBuild.bind null, '[webpack-dev-server]'

	express()
	.use express.static __base + paths.root.dest, redirect: false
	.use bodyParser.json()
	.use bodyParser.urlencoded extended: false
	.post config.getMailSendPath(), sendEmail
	.all '*', loadSite
	.listen config.getProxyPort(), config.getProxyHostname(), (err) ->
		console.error err if err
		console.info '[express-server]', config.getProxyServerUrl()
