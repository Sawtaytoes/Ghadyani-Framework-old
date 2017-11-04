// Setup directories
const base = global.baseDir

const configs = `${base}config/`
const server = `${base}server/`

const includes = `${server}includes/`
const services = `${server}services/`

module.exports = {
	base,
	configs,
	includes,
	server,
	services,
}
