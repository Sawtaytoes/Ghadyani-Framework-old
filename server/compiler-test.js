// const webpack = require('webpack')

// Config Vars
const dir = require(`${global.baseDir}/global-dirs`)
// const karmaTestConfig = require(`${dir.configs}karma.config.test`)
// const webpackTestConfig = require(`${dir.configs}webpack.config.test`)
// const { onBuild } = require(`${dir.includes}webpack-build-helpers`)
const { Server, config } = require('karma')

const karmaRunner = () => {
	const server = new Server(config.parseConfig(`${dir.configs}karma.config.test`), exitCode => {
		console.log('Karma has exited with ' + exitCode)
		process.exit(exitCode)
	})

	server.start()

	// return onBuild('webpack-test')
}

module.exports = () => {
	karmaRunner()
	// webpack(webpackTestConfig, onBuild('webpack-test'))
}
