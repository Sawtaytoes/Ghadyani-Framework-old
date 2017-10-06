const webpack = require('webpack')

const dir = require(`${global.baseDir}directories`)
const serverRunMode = require(`${dir.includes}serverRunMode`)
const webpackClientConfig = require(`${dir.configs}webpack/clientProd`)
const webpackServerConfig = require(`${dir.configs}webpack/serverProd`)
const { onBuild } = require(`${dir.includes}webpackBuildHelpers`)

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
