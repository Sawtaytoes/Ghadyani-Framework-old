const path = require('path')

// Load Config settings
const paths = require('server/utils/paths')

const getFilesAtPath = x => path.join(paths.base, x)

module.exports = getFilesAtPath(paths.src)
