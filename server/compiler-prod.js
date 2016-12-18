const webpack = require('webpack')

// Config Vars
const dir = require(`${global.baseDir}/global-dirs`)
const serverRunMode = require(`${dir.includes}server-run-mode`)
const webpackClientConfig = require(`${dir.configs}webpack.config.client.prod`)
const webpackServerConfig = require(`${dir.configs}webpack.config.server.prod`)

const onBuild = (taskName, err, stats) => {
	if (err) { throw console.error('webpack', err) }
	console.info(taskName, stats.toString({colors: true}))
}

module.exports = () => {
	if (serverRunMode.isLocalProductionTesting) {
		// We're running a dev build so watch files for changes
		webpack(webpackClientConfig)
		.watch(100, onBuild.bind(null, '[webpack-client]'))

		webpack(webpackServerConfig)
		.watch(100, onBuild.bind(null, '[webpack-server]'))

	} else {
		webpack(webpackClientConfig, onBuild.bind(null, '[webpack-client]'))
		webpack(webpackServerConfig, onBuild.bind(null, '[webpack-server]'))
	}
}
