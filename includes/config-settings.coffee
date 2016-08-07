try configCustom = require __includes + 'config'

configDefaults =
	env: 'production'                            # Can be 'development' or 'production'.

	## Server
	protocol: 'http'                             # Using `https` requires valid certificates.
	hostname: 'localhost'                        # Can be 0.0.0.0 for binding to all ports.
	port: 3000                                   # Port of webserver.
	# proxyPort: 3001                            # Optional. Will be `port + 1` if not defined.

	## Email Submission
	mailSendPath: '/contact/send'                # Path that's used when doing a POST to send mail.
	mailOptions:                                 # Options for Nodemailer.
		from: 'Fake User <fake.user@example.com>' # When sending mail, this appears in the `FROM` field
	smtpCredentials:                             # Configuration for a local maildev server.
		host: 'localhost'
		port: 1025
		tls: rejectUnauthorized: false

configEnv =
	env: process.env.NODE_ENV
	protocol: process.env.PROTOCOL
	hostname: process.env.HOSTNAME
	port: process.env.PORT
	proxyPort: process.env.PROXY_PORT
	mailSendPath: process.env.MAIL_SEND_PATH
	mailOptions: process.env.MAIL_FROM and from: process.env.MAIL_FROM
	smtpCredentials: process.env.SMTP_CREDENTIALS

Object.keys configEnv
	.forEach (key) -> typeof configEnv[key] == 'undefined' and delete configEnv[key]

config = Object.assign {}, configDefaults, configEnv, configCustom
config.port = Number config.port
config.proxyHostname = config.hostname != '0.0.0.0' and config.hostname or 'localhost'
config.proxyPort = Number config.proxyPort || config.port + 1

module.exports =
	isSecure: ->
		config.protocol == 'https'
	isDev: ->
		config.env == 'development'
	isProd: ->
		config.env == 'production'

	getEnv: ->
		config.env

	getHostname: ->
		config.hostname
	getProxyHostname: ->
		config.proxyHostname
	getPort: ->
		config.port
	getProxyPort: ->
		config.proxyPort

	getServerUrl: ->
		config.protocol + '://' + config.hostname + ':' + config.port
	getProxyServerUrl: ->
		'http://' + config.proxyHostname + ':' + config.proxyPort

	getMailSendPath: ->
		config.mailSendPath
	getMailOptions: ->
		config.mailOptions
	getSmtpCredentials: ->
		config.smtpCredentials
