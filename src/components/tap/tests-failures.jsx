import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux'

import TestFailure from 'components/tap/test-failure'
import { TAP_MESSAGE_TYPE } from 'ducks/tap'

export const TestsFailures = ({ tests, failures }) => {
	const failedTests = tests
		.map((test, index) => (test.id = index) && test)
		.filter(({ type }) => type === TAP_MESSAGE_TYPE.FAIL)

	return (
		<div>
			{failures.length > 0 && <hr />}
			{failures.length > 0 && <h2>Failures</h2>}
			{failures.map((_, index) => <TestFailure
				key={index}
				id={index}
				failedTest={failedTests[index]}
			/>)}
		</div>
	)
}

TestsFailures.propTypes = {
	tests: PropTypes.arrayOf(PropTypes.object).isRequired,
	failures: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default connect(({ tap }) => ({
	tests: tap.tests,
	failures: tap.failures,
}))(TestsFailures)
