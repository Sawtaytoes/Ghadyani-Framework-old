const context = require.context('./', true, /^\.\/.*\.test\.js$/)
context
.keys()
.filter(fileName => fileName.search('TapOutput.test.js') === -1)
.forEach(context)
