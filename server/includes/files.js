const path = require('path')

// Load Config settings
const dir = require(`${global.baseDir}/global-dirs`)
const paths = require(`${dir.includes}paths`)

const getFilesAtPath = x => path.join(dir.base, x)
module.exports = getFilesAtPath(paths.root.src)
