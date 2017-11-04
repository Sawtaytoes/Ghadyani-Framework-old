const path = require('path')

// Load Config settings
const paths = require('server/utils/paths')

const getFilesAtPath = x => path.join(dir.base, x)
module.exports = getFilesAtPath(paths.root.src)
