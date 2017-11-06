import { tapParsers } from './helpers'


// --------------------------------------------------------
// Action Names
// --------------------------------------------------------

export const SET_START_TIME = 'TAP::SET_START_TIME'
export const ADD_MESSAGE = 'TAP::ADD_MESSAGE'
export const ADD_FAILURE = 'TAP::ADD_FAILURE'


// --------------------------------------------------------
// Message Parsing
// --------------------------------------------------------

const getFailureInfo = message => {
	const [ , , , failureType, failureReason] = message.match(tapParsers.failure)

	return {
		failureReason,
		failureType,
	}
}

const getMessageInfo = message => {
	const [ , , identifier, , , messageText] = (
		message.match(tapParsers.message)
	)

	const [ , testNumber, text] = (
		messageText.match(tapParsers.test)
		|| messageText.match(tapParsers.header)
	)

	return {
		identifier,
		messageText,
		testNumber: Number(testNumber),
		text,
	}
}


// --------------------------------------------------------
// Action Creators
// --------------------------------------------------------

export const setTapStartTime = () => ({
	startTime: new Date(),
	type: SET_START_TIME,
})

export const addTapMessage = message => ({
	...getMessageInfo(message),
	endTime: new Date(),
	message,
	type: ADD_MESSAGE,
})

export const addTapFailure = message => ({
	...getFailureInfo(message),
	endTime: new Date(),
	message,
	type: ADD_FAILURE,
})
