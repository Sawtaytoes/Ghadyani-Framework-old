bodyParser = require 'body-parser'
compression = require 'compression'
config = require __includes + 'config-settings'
express = require 'express'
fs = require 'fs'
paths = require __includes + 'paths'

helmet = require 'helmet'
secureServer = (app) ->
	https = require 'https'
	enforce = require 'express-sslify'

	app
	.use enforce.HTTPS trustProtoHeader: true

	return https.createServer
		cert: fs.readFileSync('./conf/domain-crt.txt')
		key: fs.readFileSync('./conf/key.pem')
	, app

sendEmail = (req, res) ->
	require(__services + 'send-email')(req.body, res)

loadSite = (req, res) ->
	fileName = require.resolve(__base + 'web/backend.js')
	__testingProduction && delete require.cache[fileName]
	require(fileName)(req, res)

module.exports = do ->
	app = express()

	app
	.use compression()
	.use helmet()
	.use express.static __base + paths.root.dest, redirect: false
	#.use helmet.csp
	#	directives:
	#		defaultSrc: ['self']
	#		scriptSrc: ['self', 'www.google-analytics.com', 'ajax.googleapis.com']
	#		sandbox: ['allow-forms', 'allow-scripts']
	#	reportOnly: false
	#	setAllHeaders: false
	.use bodyParser.json()
	.use bodyParser.urlencoded extended: false
	.disable 'x-powered-by'
	.post config.getMailSendPath(), sendEmail
	.all '*', loadSite

	server = if config.isSecure() then secureServer app else app

	server
	.listen config.getPort(), (err) ->
		console.error err if err
		console.info 'Web Server running as', config.getServerUrl()
