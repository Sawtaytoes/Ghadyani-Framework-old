import React from 'react'
import { render } from 'react-dom'
import { match, browserHistory, Router, Route, Redirect, Link } from 'react-router'
import { Provider } from 'react-redux'

// Polyfills
import 'react-fastclick'
import 'utilities/polyfills'

// Store and Routes
import { history, store } from 'utilities/store'
import routes from './routes'

// Router
match({ history, routes }, (error, redirectLocation, renderProps) => {
	if (redirectLocation) {
		window.location = redirectLocation.pathname
	}

	render(
		<Provider store={store}>
			<Router history={browserHistory} {...renderProps} />
		</Provider>
	, document.getElementById('root'))
})
