import createReducer from 'utils/createReducer'


// --------------------------------------------------------
// Actions
// --------------------------------------------------------

const SET_TAP_START_TIME = 'SET_TAP_START_TIME'
const ADD_TAP_MESSAGE = 'ADD_TAP_MESSAGE'
const ADD_TAP_FAILURE = 'ADD_TAP_FAILURE'


// --------------------------------------------------------
// Action Creators
// --------------------------------------------------------

export const setTapStartTime = () => ({
	type: SET_TAP_START_TIME,
	startTime: new Date(),
})

export const addTapMessage = message => ({
	type: ADD_TAP_MESSAGE,
	message,
})

export const addTapFailure = message => ({
	type: ADD_TAP_FAILURE,
	message,
})


// --------------------------------------------------------
// Values & Helper Functions
// --------------------------------------------------------

const SECOND_IN_MILLISECONDS = 1000

export const TAP_START_REGEX = /^TAP version \d+$/
export const TAP_MESSAGE_REGEX = /^((ok|not ok|(# (ok|tests|pass|fail)?))[ ]*)(.+)$/
export const TAP_TEST_INFO_REGEX = /^(\d+)[ ](.+)$/
export const TAP_FAILURE_REGEX = /^((\s{4}(operator|expected|actual|stack):)|\s{6})[ ]*(.+)$/

export const tapMessageType = {
	header: 'header',
	pass: 'pass',
	fail: 'fail',
}

export const tapColor = {
	fail: 'crimson',
	info: 'dimgrey',
	pass: 'green',
}

const getFailureInfo = message => {
	const [ , , , failureType, failureReason] = message.match(TAP_FAILURE_REGEX) || []

	return {
		failureReason,
		failureType,
	}
}

const getMessageInfo = message => {
	const [ , , identifier, , , messageText] = message.match(TAP_MESSAGE_REGEX) || []

	return {
		identifier,
		messageText,
	}
}

const getTestInfo = string => {
	const [_, testNumber, text] = string.match(TAP_TEST_INFO_REGEX)

	return {
		testNumber: Number(testNumber),
		text,
	}
}


// --------------------------------------------------------
// Message Parsing
// --------------------------------------------------------

const tapCountActions = {
	'# fail': (_, count) => ({
		numFailed: Number(count),
		testsComplete: true,
	}),

	'# ok': () => ({
		testsComplete: true,
	}),

	'# pass': (_, count) => ({
		numPassed: Number(count),
	}),

	'# tests': (_, count) => ({
		numTotal: Number(count),
	}),
}

const tapTestActions = {
	'# ': ({ tests }, text) => ({
		tests: (
			tests
			.concat({
				text,
				type: tapMessageType.header,
			})
		)
	}),

	'not ok': ({ numFailed, numTotal, tests }, messageText) => ({
		numFailed: numFailed + 1,
		numTotal: numTotal + 1,
		tests: (
			tests
			.concat({
				...getTestInfo(messageText),
				type: tapMessageType.fail,
			})
		),
	}),

	'ok': ({ numPassed, numTotal, tests }, messageText) => ({
		numPassed: numPassed + 1,
		numTotal: numTotal + 1,
		tests: (
			tests
			.concat({
				...getTestInfo(messageText),
				type: tapMessageType.pass,
			})
		),
	}),
}

const getTapMessageParser = parseActions => (state, { identifier, messageText }) => (
	parseActions[identifier]
	&& parseActions[identifier](state, messageText)
)

const getParsedTapCount = getTapMessageParser(tapCountActions)
const getParsedTapTest = getTapMessageParser(tapTestActions)

const isSuccessfulEndMessage = message => message === '# ok'

const getParsedTapInfo = (state, messageInfo) => (
	getParsedTapCount(state, messageInfo)
	|| getParsedTapTest(state, messageInfo)
)

const getParsedTapMessageState = (state, message) => (
	isSuccessfulEndMessage(message)
	? tapCountActions[message]()
	: getParsedTapInfo(state, getMessageInfo(message))
)


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
	stack: failureReason => `${failureReason}\n`,
	undefined: (failureReason, incompleteFailureReason) => `${incompleteFailureReason}  ${failureReason}\n`,
}

const getNextIncompleteFailureReason = (
	(failureType, failureReason, incompleteFailureReason) => (
		incompleteFailureActions[failureType](
			failureReason,
			incompleteFailureReason,
		)
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

	const incompleteFailureReason = incompleteFailure[failureType]

	const nextFailureReason = (
		getNextIncompleteFailureReason(
			incompleteFailureType,
			failureReason,
			incompleteFailureReason,
		)
	)

	return addToPreviousFailure(failures, failureType, nextFailureReason)
}


// --------------------------------------------------------
// Reducer
// --------------------------------------------------------

export const initialState = {
	duration: 0,
	failures: [],
	numFailed: 0,
	numPassed: 0,
	numTotal: 0,
	tests: [],
	testsComplete: false,
}

const reducer = {
	[SET_TAP_START_TIME]: (
		(state, { startTime }) => ({
			...state,
			startTime,
		})
	),

	[ADD_TAP_MESSAGE]: (
		(state, { message }) => {
			const { startTime } = state
			const endTime = new Date()
			const duration = (endTime - startTime) / SECOND_IN_MILLISECONDS

			const parsedTapMessageState = getParsedTapMessageState(state, message)

			return {
				...state,
				...parsedTapMessageState,
				duration,
				endTime,
			}
		}
	),

	[ADD_TAP_FAILURE]: (state, { message }) => {
		const { failureReason, failureType } = getFailureInfo(message)

		const failures = (
			failureType
			? parseFailureType(state.failures, failureType, failureReason)
			: parseFailureReason(state.failures, failureReason)
		)

		return {
			...state,
			failures,
		}
	},
}

export default createReducer(reducer, initialState)