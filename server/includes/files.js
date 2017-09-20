const path = require('path')

// Load Config settings
const dir = require(`${global.baseDir}globalDirs`)
const paths = require(`${dir.includes}paths`)

const getFilesAtPath = x => path.join(dir.base, x)
module.exports = getFilesAtPath(paths.root.src)
