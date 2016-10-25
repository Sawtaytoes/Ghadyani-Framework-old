export const SET_TAP_START_TIME = 'SET_TAP_START_TIME'
export const ADD_TAP_MESSAGE = 'ADD_TAP_MESSAGE'

export function setTapStartTime() {
	return {
		type: SET_TAP_START_TIME,
		startTime: new Date()
	}
}

export function addTapMessage(message) {
	return {
		type: ADD_TAP_MESSAGE,
		message
	}
}
