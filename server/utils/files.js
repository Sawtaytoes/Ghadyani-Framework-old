const path = require('path')

// Load Config settings
const basePath = require('server/utils/basePath')
const paths = require('server/utils/paths')

const getFilesAtPath = x => path.join(basePath, x)

module.exports = getFilesAtPath(paths.root.src)
