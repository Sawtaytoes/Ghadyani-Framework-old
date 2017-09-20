import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'utils/polyfills'
import TestsOutput from 'components/tap/TestsOutput'
import store from 'utils/testsStore'

// Setup testing files to watch
const context = require.context('./', true, /^\.\/.*\.test\.js$/)
const testName = window.__TESTNAME__

const runTests = isTestFile => (
	context.keys()
	.filter(isTestFile)
	.forEach(context)
)

const allTests = fileName => !fileName.includes('TestsOutput.test.js')
const specificTests = testName => fileName => console.debug(fileName) || fileName.includes(`/${testName}.test.js`)

runTests(
	testName !== 'undefined'
	? specificTests(testName)
	: allTests
)

render(
	<Provider store={store}>
		<TestsOutput />
	</Provider>,
	document.getElementById('root')
)
