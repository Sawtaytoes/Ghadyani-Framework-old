// Global Dir Hack
global.baseDir = `${__dirname}/`

// Load Config settings
const dir = require(`${global.baseDir}/global-dirs`)
const config = require(`${dir.configs}config-settings`)
const serverRunMode = require(`${dir.includes}server-run-mode`)

// Bring in NewRelic if it's available
require(`${dir.services}setup-newrelic`)

// Set App Mode
const runTests = serverRunMode.mode === 'test'
const runTestsWatch = serverRunMode.mode === 'test:watch'
const runCompiler = serverRunMode.isLocalProductionTesting
	|| serverRunMode.mode === 'compile'
const runServer = serverRunMode.isLocalProductionTesting
	|| serverRunMode.mode === 'server'

// Start Webservers
if (runTests) {
	require(`${dir.server}compiler-test`)('test')

} else if (runTestsWatch) {
	require(`${dir.server}compiler-test`)('test.watch')

} else if (config.isProd()) {
	runCompiler && require(`${dir.server}compiler-prod`)()
	runServer && require(`${dir.server}server-prod`)

} else {
	require(`${dir.server}server-dev`)
}
