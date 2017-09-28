import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { render } from 'react-dom'

import getTestFiles, { isValidTestFile } from 'utils/getTestFiles'
import TestsRoot from 'components/root/TestsRoot'

const testFiles = getTestFiles()

const testName = window.__TESTNAME__
const isWildcard = testName.match(/\*$/)

const allTests = isValidTestFile
const specificTests = testName => fileName => (
	isWildcard && isValidTestFile(fileName)
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

const rootElement = document.getElementById('root')

render(
	<AppContainer>
		<TestsRoot />
	</AppContainer>,
	document.getElementById('root')
)

const onHotReload = () => {
	const TestsRootHotReload = require('./components/root/TestsRoot').default

	render(
		(
			<AppContainer>
				<TestsRootHotReload />
			</AppContainer>
		),
		rootElement
	)
}

module.hot
&& module.hot.accept('./components/root/TestsRoot', onHotReload)
