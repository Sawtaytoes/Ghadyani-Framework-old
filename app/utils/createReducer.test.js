import test from 'tape-catch'

import createReducer from './createReducer'

test('createReducer: Null Objects', t => {
	const reducer = createReducer({}, {})

	t.equal(
		typeof reducer,
		'function',
		"Created reducer is a function"
	)

	const state = reducer(undefined, { type: 'NONEXISTENT_ACTION' })

	t.deepEqual(
		state,
		{},
		"State is a null object"
	)

	t.end()
})

test('createReducer: Basic Reducer Action', t => {
	const reducer = createReducer({ TEST_ACTION: (state, { value }) => value }, 'test value')

	t.deepEqual(
		reducer(
			undefined,
			{
				type: 'NONEXISTENT_ACTION',
				value: 'next test value',
			}
		),
		'test value',
		"State has initial value after receiving an action it didn't understand"
	)

	t.deepEqual(
		reducer(
			undefined,
			{
				type: 'TEST_ACTION',
				value: 'next test value',
			}
		),
		'next test value',
		"Value was modified based on TEST_ACTION"
	)

	t.end()
})
