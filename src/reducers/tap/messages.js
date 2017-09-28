import createReducer from 'utils/createReducer'
import { ADD_MESSAGE } from './actions'

import {
	isSuccessfulEndMessage,
	tapMessageType,
} from './helpers'


// --------------------------------------------------------
// Message Parsing
// --------------------------------------------------------

const messageParsing = {
	'# ': ({ text }) => ({
		text,
		type: tapMessageType.header,
	}),

	'not ok': ({ testNumber, text }) => ({
		testNumber,
		text,
		type: tapMessageType.fail,
	}),

	'ok': ({ testNumber, text }) => ({
		testNumber,
		text,
		type: tapMessageType.pass,
	}),
}

export const initialState = []

const reducerActions = {
	[ADD_MESSAGE]: (
		(prevTests, { identifier, message, testNumber, text }) => (
			isSuccessfulEndMessage(message) || !messageParsing[identifier]
			? prevTests
			: (
				prevTests
				.concat(
					messageParsing[identifier]({ testNumber, text })
				)
			)
		)
	),
}

export default createReducer(reducerActions, initialState)
