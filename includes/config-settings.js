const dir = require(`${global.baseDir}/global-dirs`)
let configCustom = {}
try {
	configCustom = require(`${dir.includes}config`)
} catch (e) {
	// Do Nothing
}

const configDefaults = {
	env: 'production',                            // Can be 'development' or 'production'.

	//- Server
	protocol: 'http',                             // Using `https` requires valid certificates.
	hostname: '0.0.0.0',                          // Can be 0.0.0.0 for binding to all ports.
	port: 3000,                                   // Port of webserver.
	// proxyPort: 3001,                           // Optional. Will be `port + 1` if not defined.

	//- Testing
	testsPath: '/tests',                          // Path used when performing unit-tests

	//- Email Submission
	mailSendPath: '/contact/send',                // Path that's used when doing a POST to send mail.
	mailOptions: {                                // Options for Nodemailer.
		from: 'Fake User <fake.user@example.com>', // When sending mail, this appears in the `FROM` field
	},
	smtpCredentials: {                            // Configuration for a local maildev server.
		host: 'localhost',
		port: 1025,
		tls: {
			rejectUnauthorized: false,
		}
	}
}

const configEnv = {
	env: process.env.NODE_ENV,
	protocol: process.env.PROTOCOL,
	hostname: process.env.HOSTNAME,
	port: process.env.PORT,
	proxyHostname: process.env.PROXY_HOSTNAME,
	proxyPort: process.env.PROXY_PORT,
	testsPath: process.env.TESTS_PATH,
	mailSendPath: process.env.MAIL_SEND_PATH,
	mailOptions: process.env.MAIL_FROM && { from: process.env.MAIL_FROM },
	smtpCredentials: process.env.SMTP_CREDENTIALS,
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

	getMailSendPath: () => config.mailSendPath,
	getMailOptions: () => config.mailOptions,
	getSmtpCredentials: () => config.smtpCredentials,
}
