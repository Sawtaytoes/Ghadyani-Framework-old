const karmaDefaultConfig = require('config/karma/default')

module.exports = config => (
	config.set({
		...karmaDefaultConfig(config),
		singleRun: true,
	})
)
