import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import test from 'tape-catch'

import Sample from 'components/sample'

const renderSample = () => {
	return ReactTestUtils.createRenderer().render(<Sample />)
}

test('Render <Sample />', t => {
	const component = renderSample()
	t.ok(component, "<Sample /> component should exist")

	t.end()
})
