import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import TapFailure from 'components/tap/TapFailure'
import { tapMessageType } from 'reducers/tap/helpers'

const addId = (test, index) => ({
	...test,
	id: index,
})

const isFailure = ({ type }) => type === tapMessageType.fail

const hasFailedTests = failures => failures.length > 0

export const TapFailures = ({ tests, failures }) => {
	if (!hasFailedTests(failures)) { return null }

	const failedTests = (
		tests
		.map(addId)
		.filter(isFailure)
	)

	return (
		<div>
			<hr />
			<h2>Failures</h2>
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

export default connect(({ tap: { failures, tests } }) => ({
	failures,
	tests,
}))(TapFailures)
