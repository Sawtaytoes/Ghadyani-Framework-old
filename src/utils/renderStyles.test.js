import React from 'react'
import test from 'tape-catch'
import { shallow } from 'enzyme'

import renderStyles from './renderStyles'

test('renderStyles: Initialize', t => {
	const TestComponent = () => <div>Test Component</div>

	const Styles = renderStyles(TestComponent)

	const wrapper = shallow(<Styles />)

	t.ok(
		wrapper.exists(),
		"Styles component rendered properly"
	)

	t.deepEqual(
		wrapper.instance().styleRemovers,
		[],
		"Starts with no styles"
	)

	t.end()
})

test('renderStyles: Render', t => {
	const TestComponent = () => <div>Test Component</div>

	const Styles = (
		renderStyles(
			TestComponent,
			[
				require('./renderStyles.styl'),
				require('./renderStyles.styl'),
			]
		)
	)

	const wrapper = shallow(<Styles />)

	t.ok(
		wrapper.exists(),
		"Styles component rendered properly"
	)

	t.ok(
		wrapper.contains(<TestComponent />),
		"Wrapped component rendered inside of Styles"
	)

	t.ok(
		wrapper.instance().styleRemovers.length === 2,
		"Loaded styles"
	)

	t.end()
})
