import createReducer from 'utils/createReducer'

import {
	SET_START_TIME,
	ADD_MESSAGE,
} from './actions'

const SECOND_IN_MILLISECONDS = 1000

export const initialState = {
	duration: 0,
	endTime: 0,
	startTime: 0,
}

const reducerActions = {
	[SET_START_TIME]: (
		(state, { startTime }) => ({
			...state,
			startTime,
		})
	),

	[ADD_MESSAGE]: (
		state => {
			const { startTime } = state
			const endTime = new Date()
			const duration = (endTime - startTime) / SECOND_IN_MILLISECONDS

			return {
				...state,
				duration,
				endTime,
			}
		}
	),
}

export default createReducer(reducerActions, initialState)
