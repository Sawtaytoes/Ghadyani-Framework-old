// Config Vars
const dir = require(`${global.baseDir}/global-dirs`)
const karmaDefaultConfig = require(`${dir.configs}karma.config.default`)

module.exports = config => config.set(Object.assign({}, karmaDefaultConfig(config), {
	watch: {
		autoWatch: true,
		autoWatchBatchDelay: 300,
	}
}))
