const config = require('config')

const handleError = (taskName, err) => {
	throw console.error(taskName, err)
}

const onBuild = (taskName, serverUrl = '') => (err, stats) => (
	err
	? handleError(taskName, err)
	: console.info(
		`[${taskName}]`,
		serverUrl,
		stats
		? stats.toString({ colors: true })
		: ''
	)
)

const watchOptions = ({
	ignored: [
		'./cert/',
		'./config/',
		'./docker/',
		'./docs/',
		'./node_modules/',
		'./public/',
		'./scripts/',
	],
	poll: config.isDocker() && 100,
})

module.exports = Object.freeze({
	onBuild,
	watchOptions,
})
