const fs = require('fs')

const dir = require(`${global.baseDir}directories`)
const config = require(`${dir.configs}`)
const paths = require(`${dir.includes}paths`)
const webpackClientConfig = require(`${dir.configs}webpack/clientDev`)

module.exports = {
	contentBase: `${global.baseDir}${paths.root.dest}`,
	historyApiFallback: true,
	hot: true,
	https: config.isSecure() && {
		cert: config.isSecure() ? fs.readFileSync('./cert/domain-crt.txt') : null,
		key: config.isSecure() ? fs.readFileSync('./cert/key.pem') : null,
	},
	// progress: true,
	proxy: {
		'*': { target: config.getProxyServerUrl() }
	},
	publicPath: webpackClientConfig.output.publicPath,
	// quiet: true,
	stats: 'minimal',
}
