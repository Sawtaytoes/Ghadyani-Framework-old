module.exports = {
	// Use either 'development' or 'production' to mimic NODE_ENV changes.
	env: 'production',

	// Set to `true` for local development and testing.
	localDevelopment: false,


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
