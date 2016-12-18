const fs = require('fs')

// Configs
const dir = require(`${global.baseDir}/global-dirs`)
const config = require(`${dir.configs}config-settings`)
const paths = require(`${dir.includes}paths`)
const webpackClientConfig = require(`${dir.configs}webpack.config.client.dev`)

module.exports = {
	contentBase: `${global.baseDir}${paths.root.dest}`,
	historyApiFallback: true,
	hot: true,
	https: config.isSecure() && {
		cert: config.isSecure() ? fs.readFileSync('./conf/domain-crt.txt') : null,
		key: config.isSecure() ? fs.readFileSync('./conf/key.pem') : null,
	},
	// progress: true,
	proxy: {
		'*': { target: config.getProxyServerUrl() }
	},
	publicPath: webpackClientConfig.output.publicPath,
	// quiet: true,
	stats: 'minimal',
}
