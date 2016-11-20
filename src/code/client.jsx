import React from 'react'
import { render } from 'react-dom'
// import { match } from 'react-router'

// Root Component
import Root from 'root'

// Polyfills
import 'react-fastclick'
import 'utilities/polyfills'

// Store and Routes
// import { history } from 'utilities/store'
// import routes from './routes'

// Router
const RootElement = document.getElementById('root')
// match({ history, routes }, (error, redirectLocation, renderProps) => {
	// if (redirectLocation) {
	// 	window.location = redirectLocation.pathname
	// }

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
// })
