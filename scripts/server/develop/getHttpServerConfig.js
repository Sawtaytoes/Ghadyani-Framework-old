const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')

const config = require('config')
const paths = require('scripts/utils/paths')
const sendEmail = require('scripts/server/middleware/sendEmail')

require('scripts/utils/loadBabelNodeConfig')()

const loadSite = (req, res) => (
	res.send(
		require(`${paths.app}renderers/renderSite`)(
			undefined,
			{ pageMeta: {} }
		)
	)
)

const loadTests = (req, res) => (
	res.send(
		require(`${paths.app}renderers/renderTests`)(req)
	)
)

const httpServerConfig = express()

httpServerConfig
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

.get(config.getTestsPath(), loadTests)
.get(`${config.getTestsPath()}/:testName`, loadTests)

.post(config.getMailSendPath(), sendEmail)

.all('*', loadSite)

module.exports = () => httpServerConfig
