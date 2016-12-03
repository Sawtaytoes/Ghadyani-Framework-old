try require 'newrelic'

# Configure global directories
global.__base = __dirname + '/'
global.__includes = __base + 'includes/'
global.__services = __base + 'services/'
global.__webpack = __base + 'webpack/'

# Load Config settings
config = require __includes + 'config-settings'

# Set App Mode
runMode = process.argv[2]
global.__testingProduction = !runMode
runCompiler = __testingProduction || runMode == 'compile'
runServer = __testingProduction || runMode == 'server'

# Start Webservers
if config.isProd()
	runCompiler and require(__includes + 'compiler-prod')(runServer)
	runServer and require __includes + 'server-prod'
else
	require __includes + 'server-dev'
