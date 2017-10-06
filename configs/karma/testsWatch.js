const dir = require(`${global.baseDir}directories`)
const karmaDefaultConfig = require(`${dir.configs}karma/default`)

module.exports = config => (
	config.set({
		...karmaDefaultConfig(config),
		watch: {
			autoWatch: true,
			autoWatchBatchDelay: 300,
		}
	})
)
