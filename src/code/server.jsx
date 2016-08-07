import React from 'react'
import { renderToString } from 'react-dom/server'
import { RouterContext, match, memoryHistory } from 'react-router'
import { Provider } from 'react-redux'
import { compose, createStore } from 'redux'
import createMemoryHistory from 'history/lib/createMemoryHistory'

// Polyfills
import 'utilities/polyfills'
import { getInitialState } from 'utilities/initial-state'
import renderFullPage from 'utilities/render-full-page'

// Actions
import { updatePageMeta } from 'actions'

// Reducers & Routes
import rootReducer from 'reducers'
import routes from './routes'

/*
 * Export render function to be used in server/config/routes.js
 * We grab the state passed in from the server and the req object from Express/Koa
 * and pass it into the Router.run function.
 */
module.exports = function render(req, res) {
	const initialState = getInitialState()

	const history = createMemoryHistory()
	const store = compose()(createStore)(rootReducer, initialState)

	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
		if (error) {
			res.status(500).send(error.message)
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search)
		} else if (renderProps) {
			const renderedContent = renderToString(
				<Provider store={store}>
					<RouterContext history={memoryHistory} {...renderProps} />
				</Provider>
			)

			store.dispatch(updatePageMeta(req.originalUrl))

			const finalState = store.getState()
			const renderedPage = renderFullPage(renderedContent, finalState)
			res.status(200).send(renderedPage)
		} else {
			res.status(404).send('Not Found')
		}
	})
}
