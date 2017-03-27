import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'utils/polyfills'
import TestsOutput from 'components/tap/tests-output'
import store from 'utils/tests-store'

// Setup testing files to watch
const context = require.context('./', true, /^\.\/.*\.test\.jsx$/)
const testName = window.__TESTNAME__

if (testName === 'undefined') {
	context.keys()
	.filter(fileName => !fileName.includes('tests-output.test.js'))
	.forEach(context)

} else {
	context.keys()
	.filter(fileName => fileName.includes(`/${testName}.test.js`))
	.forEach(context)
}

render(
	<Provider store={store}>
		<TestsOutput />
	</Provider>
, document.getElementById('root'))
