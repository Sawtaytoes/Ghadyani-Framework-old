require('app-module-path').addPath(__dirname)

// Load Config settings
const config = require('config')
const serverRunMode = require('server/utils/serverRunMode')

// Set App Mode
const runTests = serverRunMode.mode === 'test'
const runTestsWatch = serverRunMode.mode === 'test:watch'

const runCompiler = (
	serverRunMode.isLocalProductionTesting
	|| serverRunMode.mode === 'compile'
)

const runServer = (
	serverRunMode.isLocalProductionTesting
	|| serverRunMode.mode === 'server'
)

// Start Webservers
if (runTests) {
	require('server/karmaTestRunner')('tests')
}

else if (runTestsWatch) {
	require('server/karmaTestRunner')('testsWatch')
}

else if (
	config.isProd()
	|| runCompiler !== runServer
) {
	runCompiler && require('server/webpackCompilerProd')()
	runServer && require('server/serverProd')
}

else {
	require('server/serverDev')
}
