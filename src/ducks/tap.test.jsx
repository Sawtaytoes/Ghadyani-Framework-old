import test from 'tape-catch'

import tap, {
	TAP_START_REGEX,
	TAP_MESSAGE_REGEX,
	TAP_FAILURE_REGEX,
	TAP_TEST_INFO_REGEX,

	TAP_MESSAGE_TYPE,
	TAP_COLOR,

	getInitialState,

	setTapStartTime,
	addTapMessage,
	addTapFailure,
} from './tap'

test('TAP: RegEx Start', t => {
	const re = new RegExp(TAP_START_REGEX)

	t.ok(re.test("TAP version 13"), "TAP version accurate")
	t.ok(re.test("TAP version 213"), "TAP version number can vary")

	t.notOk(
		re.test("TAP version "),
		"TAP should not start when missing version number"
	)

	t.end()
})

test('TAP: RegEx Message', t => {
	const re = new RegExp(TAP_MESSAGE_REGEX)
	const operations = [{
		text: "not ok 3 Test Name",
		shouldPassTest: true,
	}, {
		text: "ok 2 Test Name",
		shouldPassTest: true,
	}, {
		text: "# header Test Name",
		shouldPassTest: true,
	}, {
		text: "# tests 3",
		shouldPassTest: true,
	}, {
		text: "# pass 3",
		shouldPassTest: true,
	}, {
		text: "# fail 3",
		shouldPassTest: true,
	}, {
		text: "# ok",
		shouldPassTest: true,
	}, {
		text: " ",
		shouldPassTest: false,
	}, {
		text: "#",
		shouldPassTest: false,
	}, {
		text: "# ",
		shouldPassTest: false,
	}, {
		text: "Test",
		shouldPassTest: false,
	}, {
		text: "Should not work",
		shouldPassTest: false,
	}, {
		text: "#ok",
		shouldPassTest: false,
	}, {
		text: "ok",
		shouldPassTest: false,
	}]

	operations
	.forEach(
		({ text, shouldPassTest }) => {
			const value = re.test(text)

			shouldPassTest
			? t.ok(value, text, "Should parse as a passed test")
			: t.notOk(value, text, "Should parse as a passed test")
		}
	)

	t.end()
})

test('TAP: RegEx Failure', t => {
	const re = new RegExp(TAP_FAILURE_REGEX)
	const operations = [{
		text: "ok 1 <Sample /> component should exist",
		shouldPassTest: false,
	}, {
		text: "# Purposefully Failed Test 1",
		shouldPassTest: false,
	}, {
		text: "not ok 2 Math should equal",
		shouldPassTest: false,
	}, {
		text: "  ---",
		shouldPassTest: false,
	}, {
		text: "  ...",
		shouldPassTest: false,
	}, {
		text: "    operator: equal",
		shouldPassTest: true,
	}, {
		text: "    operator: error",
		shouldPassTest: true,
	}, {
		text: "    operator: notOk",
		shouldPassTest: true,
	}, {
		text: "    expected: 2",
		shouldPassTest: true,
	}, {
		text: "    expected: undefined",
		shouldPassTest: true,
	}, {
		text: "    expected: |-",
		shouldPassTest: true,
	}, {
		text: "    actual:   1",
		shouldPassTest: true,
	}, {
		text: "    actual:   'This should error!'",
		shouldPassTest: true,
	}, {
		text: "    actual: |-",
		shouldPassTest: true,
	}, {
		text: "      false",
		shouldPassTest: true,
	}, {
		text: "      { $$typeof: Symbol(react.element), _owner: null, _store: {}, key: null, props: { children: [ { $$typeof: Symbol(react.element), _owner: null, _store: {}, key: null, props: { children: 'Sample' }, ref: null, type: 'h2' }, { $$typeof: Symbol(react.element), _owner: null, _store: {}, key: null, props: { children: 'This is a sample component.' }, ref: null, type: 'p' } ] }, ref: null, type: 'div' }",
		shouldPassTest: true,
	}]

	operations
	.forEach(
		({ text, shouldPassTest }) => {
			const value = re.test(text)

			shouldPassTest
			? t.ok(value, text, "Should parse as a failed test")
			: t.notOk(value, text, "Should not parse as a failed test")
		}
	)

	t.end()
})

test('TAP: RegEx Test Info', t => {
	const re = new RegExp(TAP_TEST_INFO_REGEX)
	const operations = [{
		text: "1 1",
		shouldPassTest: true,
	}, {
		text: "3 should work",
		shouldPassTest: true,
	}, {
		text: "4 should work",
		shouldPassTest: true,
	}, {
		text: "23 should work",
		shouldPassTest: true,
	}, {
		text: "234 should work",
		shouldPassTest: true,
	}, {
		text: "should not work",
		shouldPassTest: false,
	}]

	operations
	.forEach(
		({ text, shouldPassTest }) => {
			const value = re.test(text)
			shouldPassTest ? t.ok(value, text) : t.notOk(value, text)
		}
	)

	t.end()
})

test('TAP: Message Type Enums', t => {
	t.notEqual(TAP_MESSAGE_TYPE.HEADER, TAP_MESSAGE_TYPE.FAIL)
	t.notEqual(TAP_MESSAGE_TYPE.HEADER, TAP_MESSAGE_TYPE.PASS)
	t.notEqual(TAP_MESSAGE_TYPE.PASS, TAP_MESSAGE_TYPE.FAIL)
	t.end()
})

test('TAP: Color Values', t => {
	t.equal(typeof TAP_COLOR.FAIL, 'string')
	t.equal(typeof TAP_COLOR.INFO, 'string')
	t.equal(typeof TAP_COLOR.PASS, 'string')
	t.end()
})

test('TAP: Initial State', t => {
	const state = getInitialState()

	t.equal(typeof state, 'object', "Initial state is the correct type")

	Object.values(state)
	.forEach(
		value => (
			t.ok(
				value === 0 || typeof value === 'boolean' || value.constructor.name === 'Array',
				"Value in initial state is the correct type"
			)
		)
	)

	t.end()
})

test('TAP: Action Creators', t => {
	t.ok(
		setTapStartTime().startTime instanceof Date,
		"Start time is a date object"
	)

	t.equal(
		addTapMessage('test').message,
		'test',
		"Add a test passed message"
	)

	t.equal(
		addTapFailure('test').message,
		'test',
		"Add a test failed message"
	)

	t.end()
})

test('TAP: Reducer Start Time', t => {
	const state = getInitialState()
	const action = setTapStartTime()

	const finalState = tap(state, action)

	t.deepEqual(
		finalState,
		{
			...state,
			startTime: action.startTime,
		},
		"Start time should be the same as when we started"
	)

	t.end()
})

test('TAP: Reducer Tap Messages', t => {
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

	const tapTests = [{
		type: TAP_MESSAGE_TYPE.HEADER,
		text: "Passing Test 1",
	}, {
		type: TAP_MESSAGE_TYPE.PASS,
		text: "Passes",
		testNumber: 1,
	}, {
		type: TAP_MESSAGE_TYPE.HEADER,
		text: "Failing Test 1",
	}, {
		type: TAP_MESSAGE_TYPE.FAIL,
		text: "Fails",
		testNumber: 2,
	}, {
		type: TAP_MESSAGE_TYPE.FAIL,
		text: "Fails",
		testNumber: 3,
	}, {
		type: TAP_MESSAGE_TYPE.HEADER,
		text: "Failing Test 2",
	}, {
		type: TAP_MESSAGE_TYPE.FAIL,
		text: "Fails",
		testNumber: 4,
	}, {
		type: TAP_MESSAGE_TYPE.PASS,
		text: "Passes",
		testNumber: 5,
	}, {
		type: TAP_MESSAGE_TYPE.PASS,
		text: "Passes",
		testNumber: 6,
	}, {
		type: TAP_MESSAGE_TYPE.PASS,
		text: "Passes",
		testNumber: 7,
	}, {
		type: TAP_MESSAGE_TYPE.HEADER,
		text: "Passing Test 2",
	}, {
		type: TAP_MESSAGE_TYPE.PASS,
		text: "Passes",
		testNumber: 8,
	}]

	const state = (
		tapMessages
		.reduce(
			(newState, message) => tap(newState, addTapMessage(message)),
			tap(getInitialState(), setTapStartTime())
		)
	)

	t.ok(
		state.duration >= 0,
		"Timer started"
	)

	t.ok(
		state.endTime.getTime() >= state.startTime.getTime(),
		"End time occurs after start time"
	)

	t.equal(state.numTotal, 8, "Shows total number of tests")
	t.equal(state.numPassed, 5, "Shows number of tests passed")
	t.equal(state.numFailed, 3, "Shows number of tests failed")

	t.deepEqual(state.tests, tapTests, "Tests should be parsed the same")

	t.end()
})

test('TAP: Reducer Tap Failures', t => {
	const tapFailureMessages = [
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

	const tapFailures = [{
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
		stack: "ReferenceError: nonExistentVariable is not defined\n  at Test.eval (eval at <anonymous> (http://localhost:3000/tests.bundle.js:6182:2), <anonymous>:31:2)\n  at Test.bound [as _cb] (eval at <anonymous> (http://localhost:3000/tests.bundle.js:5928:2), <anonymous>:66:32)\n  at Test.exports.Test.run (eval at <anonymous> (http://localhost:3000/tests.bundle.js:5883:2), <anonymous>:26:10)\n  at Test.bound [as run] (eval at <anonymous> (http://localhost:3000/tests.bundle.js:5928:2), <anonymous>:66:32)\n  at next (eval at <anonymous> (http://localhost:3000/tests.bundle.js:6135:2), <anonymous>:71:15)\n  at onNextTick (eval at <anonymous> (http://localhost:3000/tests.bundle.js:5831:2), <anonymous>:64:12)\n  at Item.run (eval at <anonymous> (http://localhost:3000/tests.bundle.js:861:2), <anonymous>:153:14)\n  at drainQueue (eval at <anonymous> (http://localhost:3000/tests.bundle.js:861:2), <anonymous>:123:42)\n"
	}]

	const state = (
		tapFailureMessages
		.reduce(
			(newState, message) => (
				tap(newState, addTapFailure(message))
			),
			tap(getInitialState(), setTapStartTime())
		)
	)

	t.deepEqual(state.failures, tapFailures, "Failures should be parsed the same")

	t.end()
})
