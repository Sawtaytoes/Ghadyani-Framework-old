// Config Vars
const dir = require(`${global.baseDir}/global-dirs`)
const { Server, config } = require('karma')

const karmaRunner = configFilename => {
	const server = new Server(config.parseConfig(`${dir.configs}karma.config.${configFilename}`), exitCode => {
		console.log('Karma has exited with ' + exitCode)
		process.exit(exitCode)
	})

	server.start()
}

module.exports = karmaRunner
