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

const secondInMilliseconds = 1000

export const getInitialState = () => ({
	tests: [],
	failures: [],
	numTotal: 0,
	numPassed: 0,
	numFailed: 0,
})

export const TAP_START_REGEX = /^TAP version \d+$/
export const TAP_MESSAGE_REGEX = /^((ok|not ok|(# (ok|tests|pass|fail)?))[ ]*)(.+)$/
export const TAP_FAILURE_REGEX = /^((\s{4}(operator|expected|actual):)|\s{6})[ ]*(.+)$/

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

const isInString = (string, critiera) => (
	string.search(new RegExp(`^(${critiera})`)) === 0
)

const getTestInfo = string => {
	console.debug(string)
	const [_, testNumber, text] = string.match(/^(\d+)[ ](.+)$/)

	return {
		testNumber,
		text,
	}
}


// --------------------------------------------------------
// Reducer
// --------------------------------------------------------

export default (state = getInitialState(), action) => {
	const {
		type,
		startTime,
		message,
	} = action

	switch (type) {
	case SET_TAP_START_TIME:
		return {
			...state,
			startTime
		}

	case ADD_TAP_MESSAGE: {
		const newState = { ...state }

		newState.endTime = new Date()

		newState.duration = (
			(newState.endTime - newState.startTime) / secondInMilliseconds
		)

		const test = {}
		const tapMessageIs = isInString.bind(null, message)
		const value = (message.match(TAP_MESSAGE_REGEX) || [])[5]

		if (tapMessageIs('# tests')) {
			newState.numTotal = value

		} else if (tapMessageIs('# pass')) {
			newState.numPassed = value

		} else if (tapMessageIs('# fail')) {
			newState.numFailed = value
			newState.testsComplete = true

		} else if (tapMessageIs('# ok')) {
			newState.testsComplete = true

		} else if (tapMessageIs('# ')) {
			test.type = TAP_MESSAGE_TYPE.HEADER
			test.text = value

		} else if (tapMessageIs('ok')) {
			const { testNumber, text } = getTestInfo(value)

			test.type = TAP_MESSAGE_TYPE.PASS
			test.text = text
			test.testNumber = testNumber

			newState.numTotal += 1
			newState.numPassed += 1

		} else if (tapMessageIs('not ok')) {
			const { testNumber, text } = getTestInfo(value)

			test.type = TAP_MESSAGE_TYPE.FAIL
			test.text = text
			test.testNumber = testNumber

			newState.numTotal += 1
			newState.numFailed += 1
		}

		const tests = state.tests ? state.tests.slice() : []
		tests.push(test)
		newState.tests = tests

		return { ...newState }
	}

	case ADD_TAP_FAILURE: {
		const newState = { ...state }
		const failureText = message.match(TAP_FAILURE_REGEX)
		const failure = {}

		failure.description = failureText[4]
		failure.text = failureText[5]

		const failures = state.failures ? state.failures.slice() : []
		failures.push(failure)
		newState.failures = failures

		return { ...newState }
	}

	default:
		return state
	}
}
