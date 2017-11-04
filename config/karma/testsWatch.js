const karmaDefaultConfig = require('config/karma/default')

module.exports = config => (
	config.set({
		...karmaDefaultConfig(config),
		watch: {
			autoWatch: true,
			autoWatchBatchDelay: 300,
		}
	})
)
