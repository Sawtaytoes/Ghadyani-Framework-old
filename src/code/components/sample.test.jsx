import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import test from 'tape-catch'

// Utilities
import MockStore from 'mocks/store.mock'
// import MockSample from 'mocks/sample.mock'
import TestHelper from 'utilities/test-helper'

// Components
import Sample from 'components/sample'

class TestRun extends TestHelper {
	static getVars() {
		return {}
	}

	constructor(t) {
		super(t)
		this.store = MockStore.getStore()
	}

	getSampleElement() { return (
		<Sample />
	)}

	renderSample() {
		let renderer = ReactTestUtils.createRenderer()
		return renderer.render(
			this.getSampleElement()
		)
	}
}

test('Render <Sample />', t => {
	const testRun = new TestRun(t)
	// const options = TestRun.getVars()

	const component = testRun.renderSample()
	t.ok(component, "<Sample /> component should exist")

	t.end()
})

test('Purposefully Failed Test 1', t => {
	t.equal(1, 2, "Math should equal")
	t.notEqual(2, 3, "Math should equal")

	t.end()
})

test('Purposefully Failed Test 2', () => {
	throw 'This should error!'
})

test('Purposefully Failed Test 3', t => {
	t.notok(true, "This should error")
	t.notok(true, "This should also error")
	t.notok(true, "Even this should error")
	t.end()
})

test('4 Second Test', t => {
	t.ok(true, "This happens immediately")

	setTimeout(() => {
		t.ok(true, "This happened after 4 seconds")
		t.end()
	}, 4000)
})


test('Render <Sample />', t => {
	const testRun = new TestRun(t)
	// const options = TestRun.getVars()

	const component = testRun.renderSample()
	t.ok(component, "<Sample /> component should exist")
	t.ok(component, "<Sample /> component should exist")

	t.end()
})
