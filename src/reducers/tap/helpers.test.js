import test from 'tape-catch'

import { tapParsers } from './helpers'

test('TAP Helpers: RegEx Start', t => {
	const regex = tapParsers.start

	t.ok(regex.test("TAP version 13"), "TAP version accurate")
	t.ok(regex.test("TAP version 213"), "TAP version number can vary")

	t.notOk(
		regex.test("TAP version "),
		"TAP should not start when missing version number"
	)

	t.end()
})
test('TAP Helpers: RegEx Message', t => {
	const regex = tapParsers.message
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
			const messageText = regex.test(text)

			shouldPassTest
			? t.ok(messageText, text)
			: t.notOk(messageText, text)
		}
	)

	t.end()
})

test('TAP Helpers: RegEx Failure', t => {
	const regex = tapParsers.failure
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
			const messageText = regex.test(text)

			shouldPassTest
			? t.ok(messageText, text)
			: t.notOk(messageText, text)
		}
	)

	t.end()
})

test('TAP Helpers: RegEx Test Info', t => {
	const regex = tapParsers.test
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
			const messageText = regex.test(text)

			shouldPassTest
			? t.ok(messageText, text)
			: t.notOk(messageText, text)
		}
	)

	t.end()
})
