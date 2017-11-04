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

module.exports = Object.freeze({
	onBuild,
})
