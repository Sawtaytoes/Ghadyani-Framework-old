const bodyParser = require('body-parser')
const compression = require('compression')
const express = require('express')
const helmet = require('helmet')
const path = require('path')

const config = require('config')
const paths = require('scripts/utils/paths')
const sendEmail = require('scripts/server/middleware/sendEmail')

const loadSite = (req, res) => (
	require(`${paths.base}/${paths.bundle}backend`)(req, res)
)

const httpServerConfig = express()

httpServerConfig
.use(compression())
.use(helmet())

.get('*.js', (req, res, next) => {
	req.url = `${req.url}.gz`

	res.set('Content-Encoding', 'gzip')
	res.set('Content-Type', 'application/javascript')

	next()
})

.use(
	express.static(
		path.join(paths.base, paths.static),
		{ redirect: false }
	)
)
.use(
	express.static(
		path.join(paths.base, paths.bundle),
		{ redirect: false }
	)
)

.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: false }))

.disable('x-powered-by')

.post(config.getMailSendPath(), sendEmail)

.all('*', loadSite)

module.exports = () => httpServerConfig
