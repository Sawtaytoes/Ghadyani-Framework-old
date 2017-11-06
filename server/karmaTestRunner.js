const { config, Server } = require('karma')
const paths = require('server/utils/paths')

const karmaRunner = karmaConfigFilename => {
	const server = (
		new Server(
			config.parseConfig(
				`${paths.base}/config/karma/${karmaConfigFilename}`,
				exitCode => {
					console.log('Karma has exited with ' + exitCode)
					process.exit(exitCode)
				}
			)
		)
	)

	server.start()
}

module.exports = karmaRunner
