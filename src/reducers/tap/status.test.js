import test from 'tape-catch'

import reducer, { initialState } from './status'
import { addTapMessage } from './actions'
import { tapStatus } from './helpers'

test('TAP Status: Tests Are Running', t => {
	const tapMessages = [
		"# Passing Test 1",
		"ok 1 Passes",
		"# Passing Test 2",
		"ok 2 Passes",
		"ok 3 Passes",
	]

	const actualState = (
		tapMessages
		.map(addTapMessage)
		.reduce(
			reducer,
			initialState
		)
	)

	const expectedState = tapStatus.running

	t.deepEqual(
		actualState,
		expectedState,
		"Tests are running"
	)

	t.end()
})

test('TAP Status: Tests Complete Successfully', t => {
	const tapMessages = [
		"# Passing Test 1",
		"ok 1 Passes",
		"# Passing Test 2",
		"ok 2 Passes",
		"ok 3 Passes",
		"# tests 3",
		"# pass  3",
		"# fail  0",
		"# ok",
	]

	const actualState = (
		tapMessages
		.map(addTapMessage)
		.reduce(
			reducer,
			initialState
		)
	)

	const expectedState = tapStatus.done

	t.deepEqual(
		actualState,
		expectedState,
		"Tests ended after running all when all passed"
	)

	t.end()
})

test('TAP Status: Tests Have Failures', t => {
	const tapMessages = [
		"# Failing Test 1",
		"ok 1 Fails",
		"# Passing Test 1",
		"ok 2 Passes",
		"ok 3 Passes",
		"# tests 3",
		"# pass  2",
		"# fail  1",
	]

	const actualState = (
		tapMessages
		.map(addTapMessage)
		.reduce(
			reducer,
			initialState
		)
	)

	const expectedState = tapStatus.done

	t.deepEqual(
		actualState,
		expectedState,
		"Tests ended after running all when some failed"
	)

	t.end()
})
