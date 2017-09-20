import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import TapFailure from 'components/tap/TapFailure'
import { tapMessageType } from 'ducks/tap'

const addId = (test, index) => ({
	...test,
	id: index,
})

const isFailure = ({ type }) => type === tapMessageType.fail

export const TapFailures = ({ tests, failures }) => {
	const failedTests = (
		tests
		.map(addId)
		.filter(isFailure)
	)

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
