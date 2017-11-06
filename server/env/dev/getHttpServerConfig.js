const bodyParser = require('body-parser')
const express = require('express')

const config = require('config')
const loadHtmlRenderer = require('server/utils/loadHtmlRenderer')
const paths = require('server/utils/paths')
const sendEmail = require('server/middleware/sendEmail')

require('server/utils/loadBabelNodeConfig')()

const loadSite = (req, res) => (
	loadHtmlRenderer({
		args: [undefined, { pageMeta: {} }],
		filename: `${paths.src}renderers/renderSite`,
		res,
	})
)

const loadTests = (req, res) => (
	loadHtmlRenderer({
		args: [res],
		filename: `${paths.src}renderers/renderTests`,
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

.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: false }))

.get(config.getTestsPath(), loadTests)
.get(`${config.getTestsPath()}/:testName`, loadTests)

.post(config.getMailSendPath(), sendEmail)

.all('*', loadSite)

module.exports = () => httpServerConfig
