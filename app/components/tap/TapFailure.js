import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import TapLineItem from './TapLineItem'

const styles = {
	container: {
		backgroundColor: 'pink',
	},

	content: {
		padding: '0 1em 1em',
	},

	failureContainer: {
		display: 'table',
	},

	failureDescription: {
		display: 'table-cell',
	},

	failureGroup: {
		display: 'table-row',
	},

	failureName: {
		display: 'table-cell',
		paddingRight: '1em',
		fontWeight: 'bold',
	},

	testType: {
		margin: '0.5em 0',
		fontWeight: 'bold',
		fontSize: '1.25em',
	},
}

export const TapFailure = ({
	actual,
	expected,
	failedTest,
	operator,
}) => (
	<div style={styles.container}>
		<TapLineItem {...failedTest} />

		<div style={styles.content}>
			<div style={styles.testType}>{operator}</div>

			<div style={styles.failureContainer}>
				<p style={styles.failureGroup}>
					<span style={styles.failureName}>Expected</span>
					<span style={styles.failureDescription}>{expected}</span>
				</p>
				<p style={styles.failureGroup}>
					<span style={styles.failureName}>Actual</span>
					<span style={styles.failureDescription}>{actual}</span>
				</p>
			</div>
		</div>
	</div>
)

TapFailure.propTypes = {
	actual: PropTypes.string,
	expected: PropTypes.string,
	failedTest: PropTypes.shape({
		testNumber: PropTypes.number.isRequired,
		text: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
	}).isRequired,
	id: PropTypes.number.isRequired,
	operator: PropTypes.string.isRequired,
}

const mapStateToProps = (_, initialProps) => (
	({ tap: { failures } }) => ({
		...failures[initialProps.id]
	})
)

export default connect(mapStateToProps)(TapFailure)
