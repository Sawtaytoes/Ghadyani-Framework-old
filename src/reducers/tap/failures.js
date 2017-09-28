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

const isIncompleteFailure = failure => failureType => failure[failureType] === '|-'

const addOrUpdateFailure = (failures, failureType, failureReason) => (
	failureType === 'operator'
	? failures.concat({ [failureType]: failureReason })
	: addToPreviousFailure(failures, failureType, failureReason)
)

const updateFailureReason = (failures, failureReason) => {
	const incompleteFailure = getIncompleteFailure(failures)

	const failureType = (
		Object
		.keys(incompleteFailure)
		.find(isIncompleteFailure(incompleteFailure))
	)

	return (
		failureType
		? (
			addToPreviousFailure(
				failures,
				failureType,
				failureReason
			)
		)
		: failures
	)
}


// --------------------------------------------------------
// Reducer
// --------------------------------------------------------

export const initialState = []

const reducerActions = {
	[ADD_FAILURE]: (prevFailures, { failureReason, failureType }) => (
		failureType
		? addOrUpdateFailure(prevFailures, failureType, failureReason)
		: updateFailureReason(prevFailures, failureReason)
	),
}

export default createReducer(reducerActions, initialState)
