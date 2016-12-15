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

export const getInitialState = () => ({
	tests: [],
	failures: [],
	numTotal: 0,
	numPassed: 0,
	numFailed: 0,
})

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
	const [_, testNumber, text] = string.match(TAP_TEST_INFO_REGEX)

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
			(newState.endTime - newState.startTime) / SECOND_IN_MILLISECONDS
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

			newState.tests = state.tests.slice()
			newState.tests.push(test)

		} else if (tapMessageIs('ok')) {
			const { testNumber, text } = getTestInfo(value)

			test.type = TAP_MESSAGE_TYPE.PASS
			test.text = text
			test.testNumber = testNumber

			newState.tests = state.tests.slice()
			newState.tests.push(test)

			newState.numTotal += 1
			newState.numPassed += 1

		} else if (tapMessageIs('not ok')) {
			const { testNumber, text } = getTestInfo(value)

			test.type = TAP_MESSAGE_TYPE.FAIL
			test.text = text
			test.testNumber = testNumber

			newState.tests = state.tests.slice()
			newState.tests.push(test)

			newState.numTotal += 1
			newState.numFailed += 1
		}

		return { ...newState }
	}

	case ADD_TAP_FAILURE: {
		const newState = { ...state }
		const failureInfo = message.match(TAP_FAILURE_REGEX)

		const failureType = failureInfo[3]
		const failureReason = failureInfo[4]

		newState.failures = state.failures.slice()

		if (failureType) {
			if (failureType === 'operator') {
				newState.failures.push({ [failureType]: failureReason })

			} else {
				newState.failures[newState.failures.length - 1][failureType] = failureReason
			}

		} else {
			const prevFailure = newState.failures.pop()

			if (prevFailure.expected === '|-') {
				prevFailure.expected = failureReason

			} else if (prevFailure.actual === '|-') {
				prevFailure.actual = failureReason

			} else if (prevFailure.stack === '|-') {
				prevFailure.stack = `${failureReason}\n`

			} else {
				prevFailure.stack += `  ${failureReason}\n`
			}

			newState.failures.push(prevFailure)
		}

		return { ...newState }
	}

	default:
		return state
	}
}
