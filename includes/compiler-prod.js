const webpack = require('webpack')

// Config Vars
const dir = require(`${global.baseDir}/global-dirs`)
const webpackClientConfig = require(`${dir.webpack}webpack.config.client.prod`)
const webpackServerConfig = require(`${dir.webpack}webpack.config.server.prod`)

const onBuild = (taskName, err, stats) => {
	if (err) { throw console.error('webpack', err) }
	console.info(taskName, stats.toString({colors: true}))
}

module.exports = runServer => {
	if (runServer) {
		// We're running a server so watch files for changes
		webpack(webpackServerConfig)
		.watch(100, onBuild.bind(null, '[webpack-server]'))

		webpack(webpackClientConfig)
		.watch(100, onBuild.bind(null, '[webpack-server]'))
	} else {
		webpack(webpackServerConfig, onBuild.bind(null, '[webpack-server]'))
		webpack(webpackClientConfig, onBuild.bind(null, '[webpack-client]'))
	}
}
