import test from 'tape-catch'

import reducer, { initialState } from './stats'
import { addTapMessage } from './actions'

test('TAP Stats: Message Processing', t => {
	const tapMessages = [
		"# Passing Test 1",
		"ok 1 Passes",
		"# Failing Test 2",
		"not ok 2 Fails",
		"not ok 3 Fails",
		"# tests 3",
		"# pass  1",
		"# fail  2",
	]

	const state = (
		tapMessages
		.map(addTapMessage)
		.reduce(reducer, initialState)
	)

	t.equal(state.numTotal, 3, "Shows total number of tests")
	t.equal(state.numPassed, 1, "Shows number of tests passed")
	t.equal(state.numFailed, 2, "Shows number of tests failed")

	t.end()
})
