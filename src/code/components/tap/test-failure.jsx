import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'

// Components
import Test from 'components/tap/test'

// Enums
import { TAP_COLOR } from 'ducks/tap'

class TestFailure extends PureComponent {
	static PropTypes = {
		id: PropTypes.number.isRequired,
		operator: PropTypes.string.isRequired,
		expected: PropTypes.string.isRequired,
		actual: PropTypes.string.isRequired,
		stack: PropTypes.string,
		failedTest: PropTypes.shape({
			testNumber: PropTypes.number.isRequired,
			text: PropTypes.string.isRequired,
			type: PropTypes.object.isRequired,
		}).isRequired,
	};

	render() {
		const { failedTest, operator, expected, actual, stack } = this.props

		return (
			<div>
				<Test {...failedTest} />
				<div>
					<h3>{operator}</h3>
					<p>{!stack && `Expected: ${expected}. Actual: ${actual}`}</p>
					{stack && <pre>{stack}</pre>}
				</div>
			</div>
		)
	}
}

export default connect((_, initialProps) => ({ tap }) => ({
	...(tap.failures[initialProps.id] || {})
}))(TestFailure)
