import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import TapFailure from 'components/tap/TapFailure'
import { tapMessageType } from 'ducks/tap'

export const TapFailures = ({ tests, failures }) => {
	const failedTests = tests
		.map((test, index) => (test.id = index) && test)
		.filter(({ type }) => type === tapMessageType.fail)

	return (
		<div>
			{failures.length > 0 && <hr />}
			{failures.length > 0 && <h2>Failures</h2>}
			{
				failures
				.map((_, index) => (
					<TapFailure
						key={index}
						id={index}
						failedTest={failedTests[index]}
					/>
				))
			}
		</div>
	)
}

TapFailures.propTypes = {
	tests: PropTypes.arrayOf(PropTypes.object).isRequired,
	failures: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default connect(({ tap }) => ({
	tests: tap.tests,
	failures: tap.failures,
}))(TapFailures)
