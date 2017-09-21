import React from 'react'
import test from 'tape-catch'
import { shallow } from 'enzyme'

import Sample from './Sample'

test('Render <Sample />', t => {
	t.ok(
		shallow(<Sample />).exists(),
		"<Sample /> component should exist"
	)

	t.end()
})
