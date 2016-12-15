import test from 'tape-catch'

import {
	TAP_START_REGEX,
	TAP_MESSAGE_REGEX,
	TAP_FAILURE_REGEX,
	TAP_TEST_INFO_REGEX,
} from 'ducks/tap'

test('RegEx: TAP Start', t => {
	const re = new RegExp(TAP_START_REGEX)
	t.ok(re.test("TAP version 13"), "TAP version accurate")
	t.ok(re.test("TAP version 213"), "TAP version number can vary")
	t.notOk(re.test("TAP version "),
		"TAP should not start when missing version number"
	)
	t.end()
})

test('RegEx: TAP Message', t => {
	const re = new RegExp(TAP_MESSAGE_REGEX)
	const operations = [{
		text: "not ok 3 Test Name",
		shouldPass: true,
	}, {
		text: "ok 2 Test Name",
		shouldPass: true,
	}, {
		text: "# header Test Name",
		shouldPass: true,
	}, {
		text: "# tests 3",
		shouldPass: true,
	}, {
		text: "# pass 3",
		shouldPass: true,
	}, {
		text: "# fail 3",
		shouldPass: true,
	}, {
		text: "# ok",
		shouldPass: true,
	}, {
		text: " ",
		shouldPass: false,
	}, {
		text: "#",
		shouldPass: false,
	}, {
		text: "# ",
		shouldPass: false,
	}, {
		text: "Test",
		shouldPass: false,
	}, {
		text: "Should not work",
		shouldPass: false,
	}, {
		text: "#ok",
		shouldPass: false,
	}, {
		text: "ok",
		shouldPass: false,
	}]

	operations.forEach(({ text, shouldPass }) => {
		const value = re.test(text)
		shouldPass ? t.ok(value, text) : t.notOk(value, text)
	})

	t.end()
})

test('RegEx: TAP Failure', t => {
	const re = new RegExp(TAP_FAILURE_REGEX)
	const operations = [{
		text: "ok 1 <Sample /> component should exist",
		shouldPass: false,
	}, {
		text: "# Purposefully Failed Test 1",
		shouldPass: false,
	}, {
		text: "not ok 2 Math should equal",
		shouldPass: false,
	}, {
		text: "  ---",
		shouldPass: false,
	}, {
		text: "  ...",
		shouldPass: false,
	}, {
		text: "    operator: equal",
		shouldPass: true,
	}, {
		text: "    operator: error",
		shouldPass: true,
	}, {
		text: "    operator: notOk",
		shouldPass: true,
	}, {
		text: "    expected: 2",
		shouldPass: true,
	}, {
		text: "    expected: undefined",
		shouldPass: true,
	}, {
		text: "    expected: |-",
		shouldPass: true,
	}, {
		text: "    actual:   1",
		shouldPass: true,
	}, {
		text: "    actual:   'This should error!'",
		shouldPass: true,
	}, {
		text: "    actual: |-",
		shouldPass: true,
	}, {
		text: "      false",
		shouldPass: true,
	}, {
		text: "      { $$typeof: Symbol(react.element), _owner: null, _store: {}, key: null, props: { children: [ { $$typeof: Symbol(react.element), _owner: null, _store: {}, key: null, props: { children: 'Sample' }, ref: null, type: 'h2' }, { $$typeof: Symbol(react.element), _owner: null, _store: {}, key: null, props: { children: 'This is a sample component.' }, ref: null, type: 'p' } ] }, ref: null, type: 'div' }",
		shouldPass: true,
	}]

	operations.forEach(({ text, shouldPass }) => {
		const value = re.test(text)
		shouldPass ? t.ok(value, text) : t.notOk(value, text)
	})

	t.end()
})

test('RegEx: TAP Test Info', t => {
	const re = new RegExp(TAP_TEST_INFO_REGEX)
	const operations = [{
		text: "1 1",
		shouldPass: true,
	}, {
		text: "3 should work",
		shouldPass: true,
	}, {
		text: "4 should work",
		shouldPass: true,
	}, {
		text: "23 should work",
		shouldPass: true,
	}, {
		text: "234 should work",
		shouldPass: true,
	}, {
		text: "should not work",
		shouldPass: false,
	}]

	operations.forEach(({ text, shouldPass }) => {
		const value = re.test(text)
		shouldPass ? t.ok(value, text) : t.notOk(value, text)
	})

	t.end()
})
