require('babel-core/register')
const fs = require('fs')

// Configs
const dir = require(`${global.baseDir}/global-dirs`)
const config = require(`${dir.includes}config-settings`)
const paths = require(`${dir.includes}paths`)
const webpackClientConfig = require(`${dir.webpack}webpack.config.client.dev`)

module.exports = {
	https: config.isSecure(),
	cert: config.isSecure() && fs.readFileSync('./conf/domain-crt.txt'),
	key: config.isSecure() && fs.readFileSync('./conf/key.pem'),

	contentBase: `${global.baseDir}${paths.root.dest}`,
	historyApiFallback: true,
	hot: true,
	progress: true,
	proxy: {
		'*': { target: config.getProxyServerUrl() }
	},
	publicPath: webpackClientConfig.output.publicPath,
	quiet: true,
	stats: { colors: true },
}
