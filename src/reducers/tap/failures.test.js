import test from 'tape-catch'

import reducer, { initialState } from './failures'
import { addTapFailure } from './actions'

test('TAP Failures: Parse TAP Output', t => {
	const tapFailures = [
		"    operator: equal",
		"    expected: 2",
		"    actual:   1",

		"    operator: error",
		"    expected: undefined",
		"    actual:   'This should error!'",

		"    operator: notOk",
		"    expected: false",
		"    actual:   true",

		"    operator: error",
		"    expected: |-",
		"      undefined",
		"    actual: |-",
		"      [ReferenceError: nonExistentVariable is not defined]",
		"    stack: |-",
		"      ReferenceError: nonExistentVariable is not defined",
		"          at Test.eval (eval at <anonymous> (http://localhost:3000/tests.bundle.js:6182:2), <anonymous>:31:2)",
		"          at Test.bound [as _cb] (eval at <anonymous> (http://localhost:3000/tests.bundle.js:5928:2), <anonymous>:66:32)",
		"          at Test.exports.Test.run (eval at <anonymous> (http://localhost:3000/tests.bundle.js:5883:2), <anonymous>:26:10)",
		"          at Test.bound [as run] (eval at <anonymous> (http://localhost:3000/tests.bundle.js:5928:2), <anonymous>:66:32)",
		"          at next (eval at <anonymous> (http://localhost:3000/tests.bundle.js:6135:2), <anonymous>:71:15)",
		"          at onNextTick (eval at <anonymous> (http://localhost:3000/tests.bundle.js:5831:2), <anonymous>:64:12)",
		"          at Item.run (eval at <anonymous> (http://localhost:3000/tests.bundle.js:861:2), <anonymous>:153:14)",
		"          at drainQueue (eval at <anonymous> (http://localhost:3000/tests.bundle.js:861:2), <anonymous>:123:42)",
	]

	const expectedState = [{
		actual: "1",
		expected: "2",
		operator: "equal",
	}, {
		actual: "'This should error!'",
		expected: "undefined",
		operator: "error",
	}, {
		actual: "true",
		expected: "false",
		operator: "notOk",
	}, {
		actual: "[ReferenceError: nonExistentVariable is not defined]",
		expected: "undefined",
		operator: "error",
		stack: "ReferenceError: nonExistentVariable is not defined",
	}]

	const actualState = (
		tapFailures
		.map(addTapFailure)
		.reduce(
			reducer,
			initialState
		)
	)

	t.deepEqual(
		actualState,
		expectedState,
		"Failures parsed correctly"
	)

	t.end()
})
