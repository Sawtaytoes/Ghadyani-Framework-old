webpack = require 'webpack'

webpackServerConfig = require __webpack + 'webpack.config.server.prod'
webpackClientConfig = require __webpack + 'webpack.config.client.prod'

onBuild = (taskName, err, stats) ->
	throw (console.error)('webpack', err) if err
	console.info taskName, stats.toString colors: true

module.exports = (runServer) ->
	if runServer # We're running a server so watch files for changes
		webpack webpackServerConfig
			.watch 100, onBuild.bind null, '[webpack-server]'
		webpack webpackClientConfig
			.watch 100, onBuild.bind null, '[webpack-server]'
	else
		webpack webpackServerConfig, onBuild.bind null, '[webpack-server]'
		webpack webpackClientConfig, onBuild.bind null, '[webpack-client]'
