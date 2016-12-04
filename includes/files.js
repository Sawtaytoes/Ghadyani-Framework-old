const path = require('path')

// Load Config settings
const dir = require(`${global.baseDir}/global-dirs`)
const paths = require(`${dir.includes}paths`)

const getFilesAtPath = x => path.join(dir.base, x)

module.exports = {
	asset: getFilesAtPath(paths.assets.src),
	code: getFilesAtPath(paths.code.src),
	font: getFilesAtPath(`${paths.assets.src}font/`),
	styl: getFilesAtPath(`${paths.assets.src}styl/`),
}
