const dir = require(`${global.baseDir}globalDirs`)
let configCustom = {}
try {
	configCustom = require(`${dir.configs}config`)
} catch (e) {
	// Do Nothing
}

const configDefaults = {
	// Use either 'development' or 'production'.
	env: 'production',


	// -----------------------------------------
	// Web Server
	// -----------------------------------------

	// Using `https` requires valid certificates.
	protocol: 'http',

	// Can be 0.0.0.0 for binding to all IPs.
	hostname: '0.0.0.0',

	// Port of webserver.
	port: 3000,

	// Optional. Will be `port + 1` if not defined.
	// proxyPort: 3001,


	// -----------------------------------------
	// Testing
	// -----------------------------------------

	// Path used when performing unit-tests
	testsPath: '/tests',


	// -----------------------------------------
	// eMail
	// -----------------------------------------

	// Path that's used when doing a POST to send mail.
	mailSendPath: '/contact/send',

	// When sending mail, this appears in the `FROM` field
	mailFrom: 'Fake User <fake.user@example.com>',

	// Configuration for a local maildev server.
	smtpCredentials: {
		host: 'localhost',
		port: 1025,
		tls: {
			rejectUnauthorized: false,
		}
	}
}

const configEnv = {
	env: process.env.NODE_ENV,
	hostname: process.env.HOSTNAME,
	mailFrom: process.env.MAIL_FROM,
	mailSendPath: process.env.MAIL_SEND_PATH,
	port: process.env.PORT,
	protocol: process.env.PROTOCOL,
	proxyHostname: process.env.PROXY_HOSTNAME,
	proxyPort: process.env.PROXY_PORT,
	smtpCredentials: process.env.SMTP_CREDENTIALS,
	testsPath: process.env.TESTS_PATH,
}

Object.keys(configEnv)
.forEach(key => typeof configEnv[key] === 'undefined' && delete configEnv[key])

const config = Object.assign({}, configDefaults, configEnv, configCustom)
config.port = Number(config.port)
config.proxyHostname = config.proxyHostname || config.hostname !== '0.0.0.0' && config.hostname || 'localhost'
config.proxyPort = Number(config.proxyPort || config.port + 1)

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
