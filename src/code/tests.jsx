import React from 'react'
import { render } from 'react-dom'

// Components
import TapOutput from 'components/tap-output'

// Utilities
import { store } from 'utilities/tests-store'

// Setup which files `.spec.jsx` are tests to be run
var context = require.context('../code', true, /^\.\/.*\.test\.jsx$/)
context.keys().forEach(context)

render(
	<TapOutput store={store} />
, document.getElementById('root'))
