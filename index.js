require('app-module-path').addPath(__dirname)

const config = require('config')
const serverRunMode = require('server/utils/serverRunMode')

const runModes = {
	'compile': () => require('server/webpackCompilerProd')(),
	'server': () => require('server/serverProd'),
	'test': () => require('server/karmaTestRunner')('tests'),
	'test:watch': () => require('server/karmaTestRunner')('testsWatch'),
	'undefined': () => (
		config.isProd()
		? (
			require('server/webpackCompilerLocalProd')()
			|| require('server/serverProd')
		)
		: require('server/serverDev')
	)
}

runModes[serverRunMode]()
