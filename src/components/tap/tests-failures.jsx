import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'

// Components
import TestFailure from 'components/tap/test-failure'

// Enums
import { TAP_MESSAGE_TYPE } from 'ducks/tap'

class TestsFailures extends PureComponent {
	static propTypes = {
		tests: PropTypes.arrayOf(PropTypes.object).isRequired,
		failures: PropTypes.arrayOf(PropTypes.object).isRequired,
	};

	render() {
		const { tests, failures } = this.props
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
}

export default connect(({ tap }) => ({
	tests: tap.tests,
	failures: tap.failures,
}))(TestsFailures)
