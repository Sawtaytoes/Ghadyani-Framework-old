require 'babel-core/register'
config = require __includes + 'config-settings'
fs = require 'fs'
paths = require __includes + 'paths'
webpackClientConfig = require __includes + 'webpack-dev-client-config'

webpackServerConfig =
	https: config.isSecure()
	cert: config.isSecure() and fs.readFileSync('./conf/cert.pem')
	key: config.isSecure() and fs.readFileSync('./conf/key.pem')

	contentBase: './' + paths.root.dest
	historyApiFallback: true
	hot: true
	# noInfo: true
	progress: true
	proxy: '*': target: config.getProxyServerUrl()
	publicPath: webpackClientConfig.output.publicPath
	quiet: true
	stats: colors: true

module.exports = webpackServerConfig
