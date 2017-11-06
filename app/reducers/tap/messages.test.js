import test from 'tape-catch'

import reducer, { initialState } from './messages'
import { addTapMessage } from './actions'
import { tapMessageType } from './helpers'

test('TAP Tests: Parse TAP Output', t => {
	const tapMessages = [
		"# Passing Test 1",
		"ok 1 Passes",
		"# Failing Test 1",
		"not ok 2 Fails",
		"not ok 3 Fails",
		"# Failing Test 2",
		"not ok 4 Fails",
		"ok 5 Passes",
		"ok 6 Passes",
		"ok 7 Passes",
		"# Passing Test 2",
		"ok 8 Passes",
		"# tests 8",
		"# pass  5",
		"# fail  3",
	]

	const expectedState = [{
		type: tapMessageType.header,
		text: "Passing Test 1",
	}, {
		type: tapMessageType.pass,
		text: "Passes",
		testNumber: 1,
	}, {
		type: tapMessageType.header,
		text: "Failing Test 1",
	}, {
		type: tapMessageType.fail,
		text: "Fails",
		testNumber: 2,
	}, {
		type: tapMessageType.fail,
		text: "Fails",
		testNumber: 3,
	}, {
		type: tapMessageType.header,
		text: "Failing Test 2",
	}, {
		type: tapMessageType.fail,
		text: "Fails",
		testNumber: 4,
	}, {
		type: tapMessageType.pass,
		text: "Passes",
		testNumber: 5,
	}, {
		type: tapMessageType.pass,
		text: "Passes",
		testNumber: 6,
	}, {
		type: tapMessageType.pass,
		text: "Passes",
		testNumber: 7,
	}, {
		type: tapMessageType.header,
		text: "Passing Test 2",
	}, {
		type: tapMessageType.pass,
		text: "Passes",
		testNumber: 8,
	}]

	const actualState = (
		tapMessages
		.map(addTapMessage)
		.reduce(
			reducer,
			initialState
		)
	)

	t.deepEqual(
		actualState,
		expectedState,
		"Tests parsed correctly"
	)

	t.end()
})
