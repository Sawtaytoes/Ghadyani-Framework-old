import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'

import getTestFiles, { isTapTestFile } from 'utils/getTestFiles'
import store from 'reducers/testsStore'
import TapOutput from 'components/tap/TapOutput'

const testFiles = getTestFiles()

const testName = window.__TESTNAME__
const isWildcard = testName.match(/\*$/)

const allTests = fileName => !isTapTestFile(fileName)
const specificTests = testName => fileName => (
	isWildcard && !isTapTestFile(fileName)
	? (
		fileName.match(
			new RegExp(`${testName.replace('*', '')}.*\\.test\\.js`)
		)
	)
	: fileName.includes(`/${testName}.test.js`)
)

const runTests = isTestFile => (
	testFiles
	.keys()
	.filter(isTestFile)
	.forEach(testFiles)
)

runTests(
	testName !== 'undefined'
	? specificTests(testName)
	: allTests
)

render(
	<Provider store={store}>
		<TapOutput />
	</Provider>,
	document.getElementById('root')
)
