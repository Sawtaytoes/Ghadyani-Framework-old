import createReducer from 'utils/createReducer'
import { ADD_FAILURE } from './actions'


// --------------------------------------------------------
// Failure Parsing
// --------------------------------------------------------

const getIncompleteFailure = failures => (
	failures
	.slice(-1)
	.find(() => true)
)

const getPreviousFailures = failures => (
	failures
	.slice(0, failures.length - 1)
)

const addToPreviousFailure = (failures, failureType, failureReason) => (
	getPreviousFailures(failures)
	.concat({
		...getIncompleteFailure(failures),
		[failureType]: failureReason,
	})
)

const parseFailureType = (failures, failureType, failureReason) => (
	failureType === 'operator'
	? failures.concat({ [failureType]: failureReason })
	: addToPreviousFailure(failures, failureType, failureReason)
)

const incompleteFailureActions = {
	actual: failureReason => failureReason,
	expected: failureReason => failureReason,
	stack: () => '',
	undefined: () => '',
}

const getNextIncompleteFailureReason = (
	(failureType, failureReason) => (
		incompleteFailureActions[failureType](failureReason)
	)
)

const isFailureReasonPlaceholder = failureReason => failureReason === '|-'
const isIncompleteFailure = failure => failureType => isFailureReasonPlaceholder(failure[failureType])

const parseFailureReason = (failures, failureReason) => {
	const incompleteFailure = getIncompleteFailure(failures)
	const incompleteFailureTypes = Object.keys(incompleteFailure)

	const incompleteFailureType = (
		incompleteFailureTypes
		.find(isIncompleteFailure(incompleteFailure))
	)

	const failureType = incompleteFailureType || 'stack'

	const nextFailureReason = (
		getNextIncompleteFailureReason(
			incompleteFailureType,
			failureReason
		)
	)

	return addToPreviousFailure(failures, failureType, nextFailureReason)
}


// --------------------------------------------------------
// Reducer
// --------------------------------------------------------

export const initialState = []

const reducer = {
	[ADD_FAILURE]: (prevFailures, { failureReason, failureType }) => (
		failureType
		? parseFailureType(prevFailures, failureType, failureReason)
		: parseFailureReason(prevFailures, failureReason)
	),
}

export default createReducer(reducer, initialState)
