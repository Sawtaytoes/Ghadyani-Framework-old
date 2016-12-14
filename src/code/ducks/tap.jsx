// --------------------------------------------------------
// Actions
// --------------------------------------------------------

const SET_TAP_START_TIME = 'SET_TAP_START_TIME'
const ADD_TAP_MESSAGE = 'ADD_TAP_MESSAGE'


// --------------------------------------------------------
// Action Creators
// --------------------------------------------------------

export const setTapStartTime = () => {
	return {
		type: SET_TAP_START_TIME,
		startTime: new Date()
	}
}

export const addTapMessage = message => {
	return {
		type: ADD_TAP_MESSAGE,
		message
	}
}


// --------------------------------------------------------
// Reducer
// --------------------------------------------------------

const getMessageFromLine = (line, identifier) => (
	line.match(new RegExp(`^${identifier}[ ]*(.+)$`))[1]
)

const getStateFromTapMessages = (state, messages) => {
	const newState = { ...state, messages }
	const { total, passed, failed, hasFailures } = newState

	// No further TAP output available; all tests already run
	if (total && passed && failed && hasFailures) {
		return newState
	}

	messages.forEach(line => {
		if (!hasFailures && line.search(/^(not ok)/) === 0) {
			newState.hasFailures = true

		} else if (!total && line.search(/^(# tests)/) === 0) {
			newState.endTime = new Date()

			const secondInMilliseconds = 1000
			newState.duration = (
				(newState.endTime - newState.startTime) / secondInMilliseconds
			)

			newState.total = getMessageFromLine(line, '# tests')

		} else if (!passed && line.search(/^(# pass)/) === 0) {
			newState.passed = getMessageFromLine(line, '# pass')

		} else if (!failed && line.search(/^(# fail)/) === 0) {
			newState.failed = getMessageFromLine(line, '# fail')
		}
	})

	return newState
}

export default (state = {}, action) => {
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
		const messages = state.messages ? state.messages.slice() : []
		let newState = {}

		// Check if this is a valid TAP message
		if (message.search(/^[(not ok)(ok)(\s\s)(#\s)]+.+$/) === 0) {
			messages.push(message)

			newState = getStateFromTapMessages(state, messages)
		}

		return {
			...state,
			...newState,
		}
	}

	default:
		return state
	}
}
