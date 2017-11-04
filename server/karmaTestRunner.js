const { config, Server } = require('karma')

const basePath = require('server/utils/basePath')

const karmaRunner = karmaConfigFilename => {
	const server = (
		new Server(
			config.parseConfig(
				`${basePath}/config/karma/${karmaConfigFilename}`,
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
