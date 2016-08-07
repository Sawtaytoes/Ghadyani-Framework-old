try require 'newrelic'

# Configure global directories
global.__base = __dirname + '/'
global.__includes = __base + 'includes/'

# Load Config settings
config = require __includes + 'config-settings'

# Set App Mode
runMode = process.argv[2]
runCompiler = !runMode || runMode == 'compile'
runServer = !runMode || runMode == 'server'

# Start Webservers
if config.isProd()
	runCompiler and require(__includes + 'compiler-prod')(runServer)
	runServer and require __includes + 'server-prod'
else
	require __includes + 'server-dev'
