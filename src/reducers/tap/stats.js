import createReducer from 'utils/createReducer'
import { ADD_MESSAGE } from './actions'

const messageParsing = {
	'# fail': (_, count) => ({
		numFailed: Number(count),
	}),

	'# pass': (_, count) => ({
		numPassed: Number(count),
	}),

	'# tests': (_, count) => ({
		numTotal: Number(count),
	}),

	'not ok': ({ numFailed, numTotal }) => ({
		numFailed: numFailed + 1,
		numTotal: numTotal + 1,
	}),

	'ok': ({ numPassed, numTotal }) => ({
		numPassed: numPassed + 1,
		numTotal: numTotal + 1,
	}),
}

export const initialState = {
	numFailed: 0,
	numPassed: 0,
	numTotal: 0,
}

const reducer = {
	[ADD_MESSAGE]: (
		(prevStats, { identifier, messageText }) => {
			const stats = (
				messageParsing[identifier]
				&& messageParsing[identifier](prevStats, messageText)
			)

			return {
				...prevStats,
				...stats,
			}
		}
	),
}

export default createReducer(reducer, initialState)
