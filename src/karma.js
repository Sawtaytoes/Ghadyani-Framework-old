const context = require.context('./', true, /^\.\/.*\.test\.js$/)
context
.keys()
.filter(fileName => fileName.search('testsOutput.test.js') === -1)
.forEach(context)
