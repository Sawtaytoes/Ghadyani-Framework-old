import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import TapFailure from './TapFailure'
import { tapMessageType } from 'reducers/tap/helpers'

const addId = (test, index) => ({
	...test,
	id: index,
})

const isFailure = ({ type }) => type === tapMessageType.fail

const hasFailedTests = failures => failures.length > 0

export const TapFailures = ({ messages, failures }) => {
	if (!hasFailedTests(failures)) { return null }

	const failedTests = (
		messages
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
	failures: PropTypes.arrayOf(PropTypes.object).isRequired,
	messages: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default connect(({ tap: { failures, messages } }) => ({
	failures,
	messages,
}))(TapFailures)
