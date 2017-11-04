const bodyParser = require('body-parser')
const compression = require('compression')
const express = require('express')
const helmet = require('helmet')

const basePath = require('server/utils/basePath')
const config = require('config')
const loadHtmlRenderer = require('server/utils/loadHtmlRenderer')
const paths = require('server/utils/paths')
const sendEmail = require('server/middleware/sendEmail')

const loadSite = (req, res) => (
	loadHtmlRenderer({
		args: [req, res],
		filename: `${basePath}/${paths.root.dest}backend`,
		res,
	})
)

const httpServerConfig = express()

httpServerConfig
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

module.exports = () => httpServerConfig
