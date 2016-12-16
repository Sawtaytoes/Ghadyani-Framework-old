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
			<div style={{ backgroundColor: 'pink' }}>
				<Test {...failedTest} />
				<div style={{ padding: '0 1em 1em' }}>
					<h3 style={{ margin: 0 }}>{operator}</h3>
					{!stack && <div style={{ display: 'table' }}>
						<p style={{ display: 'table-row' }}>
							<span style={{
								display: 'table-cell',
								paddingRight: '1em',
								fontWeight: 'bold',
							}}>Expected</span>
							<span style={{ display: 'table-cell' }}>{expected}</span>
						</p>
						<p style={{ display: 'table-row' }}>
							<span style={{
								display: 'table-cell',
								paddingRight: '1em',
								fontWeight: 'bold',
							}}>Actual</span>
							<span style={{ display: 'table-cell' }}>{actual}</span>
						</p>
					</div>}
					{stack && <pre style={{
						margin: 0,
						padding: 0,
						lineHeight: '1.5em',
						overflowX: 'scroll',
					}}>{stack}</pre>}
				</div>
			</div>
		)
	}
}

export default connect((_, initialProps) => ({ tap }) => ({
	...(tap.failures[initialProps.id] || {})
}))(TestFailure)
