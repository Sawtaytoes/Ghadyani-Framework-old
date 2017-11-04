const karmaDefaultConfig = require('config/karma/default')

module.exports = karmaConfig => (
	karmaConfig.set({
		...karmaDefaultConfig(karmaConfig),
		watch: {
			autoWatch: true,
			autoWatchBatchDelay: 300,
		}
	})
)
