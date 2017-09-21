import React from 'react'
import test from 'tape-catch'
import { shallow } from 'enzyme'

import 'utils/polyfills'
import { TapStats } from './TapStats'

test('TapStats: Processing', t => {
	const wrapper = shallow(
		<TapStats
			duration={0}
			isDoneProcessing={false}
			numFailed={0}
			numPassed={0}
			numTotal={0}
		/>
	)

	const contentChecks = [{
		text: 'Running tests...',
		message: "Tests are running",
	}, {
		text: 'Passing',
		message: "Test counts show Passing",
	}, {
		text: 'Failing',
		message: "Test counts show Failing",
	}]

	const wrapperText = wrapper.text()

	contentChecks
	.forEach(({ text, message }) => (
		t.ok(
			wrapperText.includes(text),
			message
		)
	))

	wrapper.unmount()
	t.end()
})

test('TapStats: Done Processing', t => {
	const wrapper = shallow(
		<TapStats
			duration={0}
			isDoneProcessing={true}
			numFailed={0}
			numPassed={0}
			numTotal={0}
		/>
	)

	const contentChecks = [{
		text: 'Stats',
		message: "Final stats are showing",
	}, {
		text: 'Passed',
		message: "Test counts show Passed",
	}, {
		text: 'Failed',
		message: "Test counts show Failed",
	}]

	const wrapperText = wrapper.text()

	contentChecks
	.forEach(({ text, message }) => (
		t.ok(
			wrapperText.includes(text),
			message
		)
	))

	wrapper.unmount()
	t.end()
})

test('TapStats: Duration', t => {
	const wrapper = shallow(
		<TapStats
			duration={0}
			isDoneProcessing={true}
			numFailed={0}
			numPassed={0}
			numTotal={0}
		/>
	)

	const contentChecks = [{
		duration: 0,
		text: '0.0s',
	}, {
		duration: 1,
		text: '1.0s',
	}, {
		duration: 2343222,
		text: '2343222.0s',
	}, {
		duration: 1.1,
		text: '1.1s',
	}, {
		duration: 23.43222,
		text: '23.4s',
	}]

	contentChecks
	.forEach(({ duration, text }) => {
		wrapper.setProps({ duration })

		t.ok(
			wrapper.text().includes(text),
			text
		)
	})

	wrapper.unmount()
	t.end()
})

test('TapStats: Passed', t => {
	const wrapper = shallow(
		<TapStats
			duration={0}
			isDoneProcessing={true}
			numFailed={0}
			numPassed={0}
			numTotal={0}
		/>
	)

	const contentChecks = [{
		numPassed: 0,
		text: '0 Passed',
	}, {
		numPassed: 1,
		text: '1 Passed',
	}, {
		numPassed: 2343222,
		text: '2343222 Passed',
	}]

	contentChecks
	.forEach(({ numPassed, text }) => {
		wrapper.setProps({ numPassed })

		t.ok(
			wrapper.text().includes(text),
			text
		)
	})

	wrapper.unmount()
	t.end()
})

test('TapStats: Failed', t => {
	const wrapper = shallow(
		<TapStats
			duration={0}
			isDoneProcessing={true}
			numFailed={0}
			numPassed={0}
			numTotal={0}
		/>
	)

	const contentChecks = [{
		numFailed: 0,
		text: '0 Failed',
	}, {
		numFailed: 1,
		text: '1 Failed',
	}, {
		numFailed: 2343222,
		text: '2343222 Failed',
	}]

	contentChecks
	.forEach(({ numFailed, text }) => {
		wrapper.setProps({ numFailed })

		t.ok(
			wrapper.text().includes(text),
			text
		)
	})

	wrapper.unmount()
	t.end()
})

test('TapStats: Total', t => {
	const wrapper = shallow(
		<TapStats
			duration={0}
			isDoneProcessing={true}
			numFailed={0}
			numPassed={0}
			numTotal={0}
		/>
	)

	const contentChecks = [{
		numTotal: 0,
		text: '0 Total',
	}, {
		numTotal: 1,
		text: '1 Total',
	}, {
		numTotal: 2343222,
		text: '2343222 Total',
	}]

	contentChecks
	.forEach(({ numTotal, text }) => {
		wrapper.setProps({ numTotal })

		t.ok(
			wrapper.text().includes(text),
			text
		)
	})

	wrapper.unmount()
	t.end()
})
