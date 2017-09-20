// Global Dir Hack
global.baseDir = `${__dirname}/`

// Load Config settings
const dir = require(`${global.baseDir}globalDirs`)
const config = require(`${dir.configs}configSettings`)
const serverRunMode = require(`${dir.includes}serverRunMode`)

// Bring in NewRelic if it's available
require(`${dir.services}setupNewrelic`)

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
	require(`${dir.server}karmaTestRunner`)('test')

} else if (runTestsWatch) {
	require(`${dir.server}karmaTestRunner`)('test.watch')

} else if (config.isProd()) {
	runCompiler && require(`${dir.server}webpackCompilerProd`)()
	runServer && require(`${dir.server}serverProd`)

} else {
	require(`${dir.server}serverDev`)
}
