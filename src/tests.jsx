import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

// Polyfills
import 'utilities/polyfills'

// Components
import TestsOutput from 'components/tap/tests-output'

// Utilities
import { store } from 'utilities/tests-store'

// Setup testing files to watch
var context = require.context('./', true, /^\.\/.*\.test\.jsx$/)
context.keys().forEach(context)

render(
	<Provider store={store}>
		<TestsOutput />
	</Provider>
, document.getElementById('root'))
