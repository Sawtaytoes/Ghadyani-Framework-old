import React from 'react'

import TestsStats from 'components/tap/TestsStats'
import TestsFailures from 'components/tap/TestsFailures'
import TestsList from 'components/tap/TestsList'

export const TestsOutput = () => (
	<div>
		<TestsStats />
		<TestsFailures />
		<TestsList />
	</div>
)

export default TestsOutput
