import React from 'react'
import { render } from 'react-dom'
import { match } from 'react-router'
import { AppContainer } from 'react-hot-loader'

// Root Component
import Root from 'root'

// Polyfills
import 'react-fastclick'
import 'utilities/polyfills'

// Store and Routes
import { history } from 'utilities/store'
import routes from './routes'

// Router
match({ history, routes }, (error, redirectLocation, renderProps) => {
	if (redirectLocation) {
		window.location = redirectLocation.pathname
	}

	render(
		<AppContainer>
			<Root renderProps={renderProps} />
		</AppContainer>
	, document.getElementById('root'))

	if (module.hot) {
		module.hot.accept('./root', () => {
			const RootContainer = require('./root').default
			render(
				<AppContainer>
					<RootContainer renderProps={renderProps} />
				</AppContainer>
			, document.getElementById('root'))
		})
	}
})
