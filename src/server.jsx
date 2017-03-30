import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { compose, createStore } from 'redux'

import 'utils/polyfills'
import renderFullPage from 'utils/render-full-page'
import rootReducer from 'ducks'
import Routes from 'routes'
import { getInitialState } from 'utils/initial-state'
import { updatePageMeta } from 'ducks/location'

module.exports = (req, res) => {
	const context = {}

	const initialState = getInitialState()
	const store = compose()(createStore)(rootReducer, initialState)

	const renderedContent = renderToString(
		<Provider store={store}>
			<Router
				location={req.url}
				context={context}
			>
				<Routes />
			</Router>
		</Provider>
	)

	console.log('[CONTEXT]', context);
	console.log('[URL 1]', context.url);
	console.log('[URL 2]', req.url);
	console.log('[URL 3]', req.originalUrl);

	store.dispatch(updatePageMeta(req.url))
	const renderedPage = renderFullPage(renderedContent, store.getState())

	if (context.url) {
		res.writeHead(302, { Location: context.url }).end()

	} else {
		res.send(renderedPage).end()
	}
}
