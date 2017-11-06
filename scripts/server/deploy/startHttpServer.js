const config = require('config')

module.exports = httpServerConfig => (
	httpServerConfig
	.listen(
		config.getPort(),
		err => (
			err
			? console.error(err)
			: console.info('Web Server running as', config.getServerUrl())
		)
	)
)
