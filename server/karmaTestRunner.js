const dir = require(`${global.baseDir}directories`)
const { Server, config } = require('karma')

const karmaRunner = configFilename => {
	const server = (
		new Server(
			config.parseConfig(
				`${dir.configs}karma/${configFilename}`,
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
