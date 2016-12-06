const bodyParser = require('body-parser')
const compression = require('compression')
const express = require('express')
const fs = require('fs')
const helmet = require('helmet')

// Configs
const dir = require(`${global.baseDir}/global-dirs`)
const config = require(`${dir.includes}config-settings`)
const paths = require(`${dir.includes}paths`)
const serverRunMode = require(`${dir.includes}server-run-mode`)

const secureServer = app => {
	const https = require('https')
	const enforce = require('express-sslify')

	app
	.use(enforce.HTTPS({ trustProtoHeader: true }))

	return https.createServer({
		cert: fs.readFileSync('./conf/domain-crt.txt'),
		key: fs.readFileSync('./conf/key.pem'),
	}, app)
}

const sendEmail = (req, res) => {
	require(`${dir.services}send-email`)(req.body, res)
}

const loadSite = (req, res) => {
	const fileName = require.resolve(`${global.baseDir}web/backend`)
	serverRunMode.isLocalProductionTesting && delete require.cache[fileName]
	require(fileName)(req, res)
}

const app = express()

app
.use(compression())
.use(helmet())
.use(express.static(`${global.baseDir}${paths.root.dest}`, { redirect: false }))
.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: false }))
.disable('x-powered-by')
.get('*.js', (req, res, next) => {
	req.url = `${req.url}.gz`
	res.set('Content-Encoding', 'gzip')
	next()
})
.post(config.getMailSendPath(), sendEmail)
.all('*', loadSite)

const server = config.isSecure() ? secureServer(app) : app

server
.listen(config.getPort(), err => {
	if (err) { console.error(err) }
	console.info('Web Server running as', config.getServerUrl())
})
