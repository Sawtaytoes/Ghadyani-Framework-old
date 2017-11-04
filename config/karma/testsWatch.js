const dir = require(`${global.baseDir}directories`)
const karmaDefaultConfig = require(`${dir.config}karma/default`)

module.exports = config => (
	config.set({
		...karmaDefaultConfig(config),
		watch: {
			autoWatch: true,
			autoWatchBatchDelay: 300,
		}
	})
)
