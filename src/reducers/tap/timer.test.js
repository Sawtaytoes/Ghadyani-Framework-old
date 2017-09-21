import test from 'tape-catch'

import {
	addTapMessage,
	setTapStartTime,
} from './actions'

import reducer, { initialState } from './timer'

test('TAP Timer: Start Time', t => {
	const action = setTapStartTime()
	const state = reducer(initialState, action)

	const expectedState = {
		...initialState,
		startTime: action.startTime,
	}

	t.equal(
		state.startTime,
		action.startTime,
		"Start time should be the same as when we started"
	)

	t.deepEqual(
		state,
		expectedState,
		"State is in the correct format"
	)

	t.end()
})

test('TAP Timer: Duration & End Time', t => {
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

	const timerStartedState = reducer(initialState, setTapStartTime())

	// Ensure these tests give enough time for the timer to run
	new Promise(setTimeout)
	.then(() => {
		const state = (
			tapMessages
			.map(addTapMessage)
			.reduce(reducer, timerStartedState)
		)

		t.ok(
			state.duration > 0,
			"Timer started"
		)

		t.ok(
			state.endTime.getTime() > state.startTime.getTime(),
			"End time occurs after start time"
		)

		t.end()
	})
})
