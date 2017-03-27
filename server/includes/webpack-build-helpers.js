const onBuild = (taskName, serverUrl = '') => (err, stats) => {
	if (err) { throw console.error('webpack', err) }
	console.info(`[${taskName}]`, serverUrl, stats ? stats.toString({ colors: true }) : '')
}

module.exports = Object.freeze({
	onBuild,
})
