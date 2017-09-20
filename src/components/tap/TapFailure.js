import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import TapItem from 'components/tap/TapItem'

const styles = {
	stackTrace: {
		margin: 0,
		padding: 0,
		lineHeight: '1.5em',
		overflowX: 'scroll',
	},

	container: {
		display: 'table',
	},

	description: {
		display: 'table-cell',
	},

	group: {
		display: 'table-row',
	},

	name: {
		display: 'table-cell',
		paddingRight: '1em',
		fontWeight: 'bold',
	},
}

export const TapFailure = ({
	actual,
	expected,
	failedTest,
	operator,
	stack,
}) => (
	<div style={{ backgroundColor: 'pink' }}>
		<TapItem {...failedTest} />

		<div style={{ padding: '0 1em 1em' }}>
			<h3 style={{ margin: 0 }}>{operator}</h3>

			{
				stack
				&& (
					<pre style={styles.stackTrace}>
						{stack}
					</pre>
				)
			}

			{
				!stack
				&& (
					<div style={styles.container}>
						<p style={styles.group}>
							<span style={styles.name}>Expected</span>
							<span style={styles.description}>{expected}</span>
						</p>
						<p style={styles.group}>
							<span style={styles.name}>Actual</span>
							<span style={styles.description}>{actual}</span>
						</p>
					</div>
				)
			}
		</div>
	</div>
)

TapFailure.propTypes = {
	actual: PropTypes.string,
	expected: PropTypes.string,
	failedTest: PropTypes.shape({
		testNumber: PropTypes.number.isRequired,
		text: PropTypes.string.isRequired,
		type: PropTypes.object.isRequired,
	}).isRequired,
	id: PropTypes.number.isRequired,
	operator: PropTypes.string.isRequired,
	stack: PropTypes.string,
}

const mapStateToProps = (_, initialProps) => (
	({ tap: { failures } }) => ({
		...(failures[initialProps.id] || {})
	})
)

export default connect(mapStateToProps)(TapFailure)
