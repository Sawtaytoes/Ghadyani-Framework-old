import React from 'react'
import { render } from 'react-dom'

// Root Component
import Root from 'root'

// Polyfills
import 'react-fastclick'
import 'utilities/polyfills'

// Router
const RootElement = document.getElementById('root')

render(
	<Root />
, RootElement)

if (module.hot) {
	module.hot.accept('./root', () => {
		const RootContainer = require('./root').default

		render(
			<RootContainer />
		, RootElement)
	})
}
