import test from 'tape-catch'

import {
	addTapFailure,
	addTapMessage,
	setTapStartTime,
} from './actions'

test('TAP Action: Start Timer', t => {
	const { startTime } = setTapStartTime()

	t.ok(
		startTime instanceof Date,
		"Start Time is a date"
	)

	t.end()
})

test('TAP Action: Add Tap Message', t => {
	const {
		endTime,
		identifier,
		message,
		messageText,
		testNumber,
		text,
	} = addTapMessage('not ok 3 Test Name')

	t.equal(
		identifier,
		'not ok',
		"Identifier"
	)

	t.equal(
		message,
		'not ok 3 Test Name',
		"Message"
	)

	t.equal(
		messageText,
		'3 Test Name',
		"Message Text"
	)

	t.equal(
		testNumber,
		3,
		"Test Number"
	)

	t.equal(
		text,
		'Test Name',
		"Text"
	)

	t.ok(
		endTime instanceof Date,
		"End Time is a date"
	)

	t.end()
})

test('TAP Action: Add Tap Message Header', t => {
	const {
		identifier,
		message,
		testNumber,
		text,
	} = addTapMessage('# Header Test Name')

	t.equal(
		identifier,
		'# ',
		"Identifier"
	)

	t.equal(
		message,
		'# Header Test Name',
		"Message"
	)

	t.equal(
		testNumber,
		0,
		"Test Number"
	)

	t.equal(
		text,
		'Header Test Name',
		"Text"
	)

	t.end()
})

test('TAP Action: Add Tap Failure', t => {
	const {
		endTime,
		failureReason,
		failureType,
		message,
	} = addTapFailure('    operator: equal')

	t.equal(
		failureReason,
		'equal',
		"Failure Reason"
	)

	t.equal(
		failureType,
		'operator',
		"Failure Type"
	)

	t.equal(
		message,
		'    operator: equal',
		"Message"
	)

	t.ok(
		endTime instanceof Date,
		"End Time is a date"
	)

	t.end()
})
