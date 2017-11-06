const bodyParser = require('body-parser')
const express = require('express')

const config = require('config')
const loadHtmlRenderer = require('scripts/utils/loadHtmlRenderer')
const paths = require('scripts/utils/paths')
const sendEmail = require('scripts/server/middleware/sendEmail')

require('scripts/utils/loadBabelNodeConfig')()

const loadSite = (req, res) => (
	loadHtmlRenderer({
		args: [undefined, { pageMeta: {} }],
		filename: `${paths.app}renderers/renderSite`,
		res,
	})
)

const loadTests = (req, res) => (
	loadHtmlRenderer({
		args: [res],
		filename: `${paths.app}renderers/renderTests`,
		res,
	})
)

const httpServerConfig = express()

httpServerConfig
.use(
	express.static(
		`${paths.base}/${paths.static}`,
		{ redirect: false }
	)
)
.use(
	express.static(
		`${paths.base}/${paths.bundles}`,
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
