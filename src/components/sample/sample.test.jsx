import { shallow } from 'enzyme'
import React from 'react'
import test from 'tape-catch'

import Sample from './sample'

test('Render <Sample />', t => {
	t.ok(
		shallow(<Sample />).exists(),
		"<Sample /> component should exist"
	)

	t.end()
})
