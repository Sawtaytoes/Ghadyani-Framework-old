require('app-module-path').addPath(__dirname)

const config = require('config')
const serverRunMode = require('server/utils/serverRunMode')

const loadLocalDevelopmentEnvironment = () => (
	config.isDev()
	? require('server/env/dev')()
	: (
		require('server/compiler/webpackWatch')()
		|| require('server/env/prod')()
	)
)

const runModes = {
	'compile': () => require('server/compiler/webpack')(),
	'server': () => require('server/env/prod')(),
	'test': () => require('server/karmaTestRunner')('tests'),
	'test:watch': () => require('server/karmaTestRunner')('testsWatch'),
	'undefined': loadLocalDevelopmentEnvironment
}

runModes[serverRunMode]()
