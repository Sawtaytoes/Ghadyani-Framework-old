import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'

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

export default TestRun
