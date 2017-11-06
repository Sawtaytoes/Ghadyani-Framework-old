require('app-module-path').addPath(__dirname)

const config = require('config')
const runMode = require('scripts/utils/runMode')

const loadLocalDevelopmentEnvironment = () => (
	config.isDev()
	? require('scripts/server/develop')()
	: (
		require('scripts/compiler/webpackWatch')()
		|| require('scripts/server/prod')()
	)
)

const runModes = {
	'compile': () => require('scripts/compiler/webpack')(),
	'server': () => require('scripts/server/deploy')(),
	'test': () => require('scripts/tester/karma')('tests'),
	'test:watch': () => require('scripts/tester/karma')('testsWatch'),
	'undefined': loadLocalDevelopmentEnvironment
}

runModes[runMode]()
