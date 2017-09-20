import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import { tapColor } from 'ducks/tap'

const fontSize = '2em'

const styles = {
	pageHeading: {
		marginTop: 0
	},

	standardFontSize: {
		fontSize
	},

	tapContainer: {
		margin: '0 0.4em'
	},

	tapInfo: {
		color: tapColor.info,
		fontSize,
	},

	tapPass: {
		color: tapColor.pass,
		fontSize,
	},

	tapFail: {
		color: tapColor.fail,
		fontSize,
	},
}

export const TestsStats = ({
	duration,
	numFailed,
	numPassed,
	numTotal,
	testsComplete,
}) => (
	<div>
		<h1 style={styles.pageHeading}>
			{testsComplete ? 'Stats' : 'Running tests...'}
		</h1>

		<p style={styles.tapContainer}>
			<span style={styles.tapInfo}>{numTotal} </span>Total

			<span style={styles.standardFontSize}> | </span>
			<span style={styles.tapPass}>{numPassed} </span>{testsComplete ? 'Passed' : 'Passing'}

			<span style={styles.standardFontSize}> | </span>
			<span style={styles.tapFail}>{numFailed} </span>{testsComplete ? 'Failed' : 'Failing'}

			{duration && <span style={styles.standardFontSize}> | </span>}
			{
				duration
				&& (
					<span>
						<span style={styles.tapInfo}>{duration.toFixed(1)}s </span>Duration
					</span>
				)
			}
		</p>
	</div>
)

TestsStats.propTypes = {
	duration: PropTypes.number.isRequired,
	numFailed: PropTypes.number.isRequired,
	numPassed: PropTypes.number.isRequired,
	numTotal: PropTypes.number.isRequired,
	testsComplete: PropTypes.bool.isRequired,
};

export default connect(({ tap }) => ({
	duration: tap.duration,
	numFailed: tap.numFailed,
	numPassed: tap.numPassed,
	numTotal: tap.numTotal,
	testsComplete: tap.testsComplete,
}))(TestsStats)
