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

const Enum = () => ({})
export const TAP_MESSAGE_TYPE = {
	HEADER: Enum(),
	PASS: Enum(),
	FAIL: Enum(),
}

export const TAP_COLOR = {
	FAIL: 'crimson',
	INFO: 'dimgrey',
	PASS: 'green',
}

const getFailureInfo = message => {
	const [ , , , failureType, failureReason] = message.match(TAP_FAILURE_REGEX) || []

	return {
		failureReason,
		failureType,
	}
}

const getIncompleteFailure = failures => (
	failures
	.slice(failures.length)
	.find(() => true)
)

const getMessageInfo = message => {
	const [ , , identifier, , , messageText] = message.match(TAP_MESSAGE_REGEX) || []

	return {
		identifier,
		messageText,
	}
}

const getPreviousFailures = failures => (
	failures
	.slice(0, failures.length - 1)
)

const getTestInfo = string => {
	const [_, testNumber, text] = string.match(TAP_TEST_INFO_REGEX)

	return {
		testNumber: Number(testNumber),
		text,
	}
}

const isSuccessfulEndMessage = message => message === '# ok'

const messageMatchesIdentifier = (
	identifier => ({ messageIdentifier }) => (
		identifier === messageIdentifier
	)
)

const tapCountActions = {
	'# fail': count => ({
		numFailed: Number(count),
		testsComplete: true,
	}),

	'# ok': () => ({
		testsComplete: true,
	}),

	'# pass': count => ({
		numPassed: Number(count),
	}),

	'# tests': count => ({
		numTotal: Number(count),
	}),
}

const tapTestActions = {
	'# ': ({ tests }, text) => ({
		tests: (
			tests
			.concat({
				text,
				type: TAP_MESSAGE_TYPE.HEADER,
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
				type: TAP_MESSAGE_TYPE.FAIL,
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
				type: TAP_MESSAGE_TYPE.PASS,
			})
		),
	}),
}

const getParseActions = parseActions => (
	Object
	.keys(parseActions)
	.map(
		messageIdentifier => ({
			messageIdentifier,
			parseAction: parseActions[messageIdentifier]
		})
	)
)

const tapCountParseActions = getParseActions(tapCountActions)
const tapTestParseActions = getParseActions(tapTestActions)


// --------------------------------------------------------
// Reducer
// --------------------------------------------------------

export const getInitialState = () => ({
	duration: 0,
	failures: [],
	numFailed: 0,
	numPassed: 0,
	numTotal: 0,
	tests: [],
	testsComplete: false,
})

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

			const { identifier, messageText } = getMessageInfo(message)

			const [tapCounts] = (
				tapCountParseActions
				.filter(messageMatchesIdentifier(identifier))
				.map(({ parseAction }) => parseAction(messageText))
			)

			const [tapTests] = (
				tapTestParseActions
				.filter(messageMatchesIdentifier(identifier))
				.map(({ parseAction }) => parseAction(state, messageText))
			)

			const successfulEndState = (
				isSuccessfulEndMessage(message)
				&& tapCountActions[message]
			)

			return {
				...state,
				...tapCounts,
				...(successfulEndState || tapTests),
				duration,
				endTime,
			}
		}
	),

	[ADD_TAP_FAILURE]: (state, { message }) => {
		const { failureReason, failureType } = getFailureInfo(message)

		const handleFailureType = (failures, failureType, failureReason) => (
			failureType === 'operator'
			? failures.concat({ [failureType]: failureReason })
			: (
				getPreviousFailures(failures)
				.concat({
					...getIncompleteFailure(failures),
					[failureType]: failureReason,
				})
			)
		)

		const failures = (
			failureType
			? handleFailureType(state.failures, failureType, failureReason)
			: state.failures.slice()
		)

		if (!failureType) {
			const prevFailure = failures.pop()

			if (prevFailure.expected === '|-') {
				prevFailure.expected = failureReason

			} else if (prevFailure.actual === '|-') {
				prevFailure.actual = failureReason

			} else if (prevFailure.stack === '|-') {
				prevFailure.stack = `${failureReason}\n`

			} else {
				prevFailure.stack += `  ${failureReason}\n`
			}

			failures.push(prevFailure)
		}

		return {
			...state,
			failures,
		}
	},
}

export default createReducer(reducer, getInitialState())
