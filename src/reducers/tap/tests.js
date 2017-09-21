import createReducer from 'utils/createReducer'
import { ADD_MESSAGE } from './actions'
import { tapMessageType } from './helpers'


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

const isEndMessage = message => message === '# ok'

export const initialState = []

const reducer = {
	[ADD_MESSAGE]: (
		(prevTests, { identifier, message, testNumber, text }) => (
			isEndMessage(message) || !messageParsing[identifier]
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

export default createReducer(reducer, initialState)
