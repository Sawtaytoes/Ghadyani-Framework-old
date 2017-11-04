const bodyParser = require('body-parser')
const compression = require('compression')
const express = require('express')
const fs = require('fs')
const helmet = require('helmet')

const basePath = require('server/utils/basePath')
const config = require('config')
const paths = require('server/utils/paths')
const serverRunMode = require('server/utils/serverRunMode')

const secureServer = serverConfig => {
	const https = require('https')
	const enforce = require('express-sslify')

	serverConfig
	.use(enforce.HTTPS({ trustProtoHeader: true }))

	return (
		https.createServer(
			{
				cert: fs.readFileSync('./cert/domain-crt.txt'),
				key: fs.readFileSync('./cert/key.pem'),
			},
			serverConfig
		)
	)
}

const sendEmail = (req, res) => {
	require('server/middleware/sendEmail')(req.body, res)
}

const loadSite = (req, res) => {
	const fileName = require.resolve(`${basePath}/${paths.root.dest}backend`)

	serverRunMode.isLocalProductionTesting && delete require.cache[fileName]
	require(fileName)(req, res)
}

const serverConfig = express()

serverConfig
.use(compression())
.use(helmet())

.use(
	express.static(
		`${basePath}/${paths.root.dest}`,
		{ redirect: false }
	)
)

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

const server = (
	config.isSecure()
	? secureServer(serverConfig)
	: serverConfig
)

server.listen(
	config.getPort(),
	err => (
		err
		? console.error(err)
		: console.info('Web Server running as', config.getServerUrl())
	)
)
