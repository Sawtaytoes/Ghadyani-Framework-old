import React from 'react'

// Components
import TestsStats from 'components/tap/tests-stats'
import TestsFailures from 'components/tap/tests-failures'
import TestsList from 'components/tap/tests-list'

export const TestsOutput = () => (
	<div>
		<TestsStats />
		<TestsFailures />
		<TestsList />
	</div>
)

export default TestsOutput
