const fs = require('fs')

const dir = require(`${global.baseDir}directories`)
const config = require(`${dir.configs}`)
const webpackClientConfig = require(`${dir.configs}webpack/clientDev`)

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
