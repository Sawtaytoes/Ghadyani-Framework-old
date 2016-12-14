import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

// Enums
import {
	TAP_MESSAGE_TYPE,
	TAP_COLOR,
} from 'ducks/tap'

class TestsList extends PureComponent {
	render() {
		const {
			numTotal,
			numPassed,
			numFailed,
			duration,
			testsComplete
		} = this.props

		return (
			<div>
				<h1>{testsComplete ? 'Stats' : 'Running tests...'}</h1>

				<p>
					<span>
						Total
						<span> </span>
						<span style={{color: TAP_COLOR.INFO}}>{numTotal}</span>
					</span>

					<span> | </span>
					<span>
						{testsComplete ? 'Passed' : 'Passing'}
						<span> </span>
						<span style={{color: TAP_COLOR.PASS}}>{numPassed}</span>
					</span>

					<span> | </span>
					<span>
						{testsComplete ? 'Failed' : 'Failing'}
						<span> </span>
						<span style={{color: TAP_COLOR.FAIL}}>{numFailed}</span>
					</span>

					{duration && <span> | </span>}
					{duration && <span>
						Duration
						<span> </span>
						<span style={{color: TAP_COLOR.INFO}}>{duration.toFixed(1)}s</span>
					</span>}
				</p>
			</div>
		)
	}
}

export default connect(({ tap }) => ({
	duration: tap.duration,
	numFailed: tap.numFailed,
	numPassed: tap.numPassed,
	numTotal: tap.numTotal,
	testsComplete: tap.testsComplete,
}))(TestsList)
