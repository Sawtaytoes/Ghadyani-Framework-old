require('./setup-newrelic')

// Global Dir Hack
global.baseDir = `${__dirname}/`

// Load Config settings
const dir = require(`${global.baseDir}/global-dirs`)
const config = require(`${dir.includes}config-settings`)
const serverRunMode = require(`${dir.includes}server-run-mode`)

// Set App Mode
const runCompiler = serverRunMode.isLocalProductionTesting
	|| serverRunMode.mode === 'compile'
const runServer = serverRunMode.isLocalProductionTesting
	|| serverRunMode.mode === 'server'

// Start Webservers
if (config.isProd()) {
	runCompiler && require(`${dir.includes}compiler-prod`)(runServer)
	runServer && require(`${dir.includes}server-prod`)
} else {
	require(`${dir.includes}server-dev`)
}
