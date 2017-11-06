import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import {
	isDoneProcessing,
	tapColor,
} from 'reducers/tap/helpers'

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

export const TapStats = ({
	duration,
	isDoneProcessing,
	numFailed,
	numPassed,
	numTotal,
}) => (
	<div>
		<h1 style={styles.pageHeading}>
			{isDoneProcessing ? 'Stats' : 'Running tests...'}
		</h1>

		<p style={styles.tapContainer}>
			<span style={styles.tapInfo}>{numTotal} </span>Total

			<span style={styles.standardFontSize}> | </span>
			<span style={styles.tapPass}>{numPassed} </span>{isDoneProcessing ? 'Passed' : 'Passing'}

			<span style={styles.standardFontSize}> | </span>
			<span style={styles.tapFail}>{numFailed} </span>{isDoneProcessing ? 'Failed' : 'Failing'}

			<span style={styles.standardFontSize}> | </span>
			<span>
				<span style={styles.tapInfo}>{duration.toFixed(1)}s </span>Duration
			</span>
		</p>
	</div>
)

TapStats.propTypes = {
	duration: PropTypes.number.isRequired,
	isDoneProcessing: PropTypes.bool.isRequired,
	numFailed: PropTypes.number.isRequired,
	numPassed: PropTypes.number.isRequired,
	numTotal: PropTypes.number.isRequired,
};

export default connect(({ tap: { stats, status, timer } }) => ({
	duration: timer.duration,
	isDoneProcessing: isDoneProcessing(status),
	numFailed: stats.numFailed,
	numPassed: stats.numPassed,
	numTotal: stats.numTotal,
}))(TapStats)
