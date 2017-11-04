const fs = require('fs')

const defaultConfig = require('config/default')
const envConfig = require('config/env')

const configFilePath = 'config/custom.js'
const customConfig = (
	fs.existsSync(configFilePath)
	? require(configFilePath)
	: {}
)

const config = {
	...defaultConfig,
	...envConfig,
	...customConfig
}

config.port = Number(config.port)
config.proxyPort = Number(config.proxyPort || config.port + 1)
config.proxyHostname = (
	config.proxyHostname
	|| (
		config.hostname !== '0.0.0.0'
		&& config.hostname
	)
	|| 'localhost'
)

module.exports = {
	isSecure: () => config.protocol === 'https',
	isDev: () => config.env === 'development',
	isProd: () => config.env === 'production',

	getEnv: () => config.env,

	getProtocol: () => config.protocol,
	getHostname: () => config.hostname,
	getPort: () => config.port,

	getProxyPort: () => config.proxyPort,
	getProxyHostname: () => config.proxyHostname,

	getTestsPath: () => config.testsPath,

	getServerUrl: () => `${config.protocol}://${config.hostname}:${config.port}`,
	getProxyServerUrl: () => `http://${config.proxyHostname}:${config.proxyPort}`,

	getMailFrom: () => config.mailFrom,
	getMailSendPath: () => config.mailSendPath,
	getSmtpCredentials: () => config.smtpCredentials,
}
