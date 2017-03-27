const webpack = require('webpack')

// Config Vars
const dir = require(`${global.baseDir}/global-dirs`)
const serverRunMode = require(`${dir.includes}server-run-mode`)
const webpackClientConfig = require(`${dir.configs}webpack.config.client.prod`)
const webpackServerConfig = require(`${dir.configs}webpack.config.server.prod`)
const { onBuild } = require(`${dir.includes}webpack-build-helpers`)

module.exports = () => {
	if (serverRunMode.isLocalProductionTesting) {
		// We're running a dev build so watch files for changes
		webpack(webpackClientConfig)
		.watch(100, onBuild('webpack-client'))

		webpack(webpackServerConfig)
		.watch(100, onBuild('webpack-server'))

	} else {
		webpack(webpackClientConfig, onBuild('webpack-client'))
		webpack(webpackServerConfig, onBuild('webpack-server'))
	}
}
