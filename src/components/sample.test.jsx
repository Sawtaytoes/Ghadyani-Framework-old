import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import test from 'tape-catch'

// Utilities
import TestHelper from 'utils/test-helper'

// Components
import Sample from 'components/sample'

class TestRun extends TestHelper {
	static getVars() {
		return {}
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
