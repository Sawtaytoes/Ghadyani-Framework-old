const config = require('config')

module.exports = ({ args, filename, res }) => {
	const filePath = require.resolve(filename)

	config.isLocalDevelopment() && delete require.cache[filePath]
	res.send(require(filePath)(...args))
}
