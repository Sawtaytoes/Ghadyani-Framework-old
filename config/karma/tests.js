const karmaDefaultConfig = require('config/karma/default')

module.exports = karmaConfig => (
	karmaConfig.set({
		...karmaDefaultConfig(karmaConfig),
		singleRun: true,
	})
)
