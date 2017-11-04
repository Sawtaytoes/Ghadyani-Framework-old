const fs = require('fs')

const config = require('config')
const webpackClientConfig = require('config/webpack/clientDev')

module.exports = {
	historyApiFallback: true,
	hot: true,
	https: config.isSecure() && {
		cert: config.isSecure() ? fs.readFileSync('./cert/domain-crt.txt') : null,
		key: config.isSecure() ? fs.readFileSync('./cert/key.pem') : null,
	},
	proxy: {
		'*': { target: config.getProxyServerUrl() }
	},
	publicPath: webpackClientConfig.output.publicPath,
	stats: 'minimal',
}
