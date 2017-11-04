const fs = require('fs')

const config = require('config')
const webpackClientConfig = require('config/webpack/clientDev')

module.exports = {
	historyApiFallback: true,
	hot: true,
	https: (
		config.isSecure()
		&& {
			cert: fs.readFileSync('./cert/domain-crt.txt'),
			key: fs.readFileSync('./cert/key.pem'),
		}
	),
	proxy: {
		'*': { target: config.getProxyServerUrl() }
	},
	publicPath: webpackClientConfig.output.publicPath,
	stats: 'minimal',
}
