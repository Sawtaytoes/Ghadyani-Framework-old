const context = require.context('./', true, /^\.\/.*\.test\.jsx$/)
context
.keys()
.filter(fileName => fileName.search('tests-output.test.js') === -1)
.forEach(context)
