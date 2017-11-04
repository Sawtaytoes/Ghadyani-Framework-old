const dir = require(`${global.baseDir}directories`)
const karmaDefaultConfig = require(`${dir.config}karma/default`)

module.exports = config => (
	config.set({
		...karmaDefaultConfig(config),
		singleRun: true,
	})
)
