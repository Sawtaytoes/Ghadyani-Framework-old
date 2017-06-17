import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { compose, createStore } from 'redux'

import 'utils/polyfills'
import Pages from 'pages'
import renderFullPage from 'utils/render-full-page'
import rootReducer from 'ducks'
import { updatePageMeta } from 'ducks/page-meta'

module.exports = (req, res) => {
	const context = {}

	const store = compose()(createStore)(rootReducer)

	const renderedContent = renderToString(
		<Provider store={store}>
			<Router
				location={req.url}
				context={context}
			>
				<Pages />
			</Router>
		</Provider>
	)

	store.dispatch(updatePageMeta(req.url))
	const renderedPage = renderFullPage(renderedContent, store.getState())

	if (context.url) {
		res.writeHead(302, { Location: context.url })
		res.end()

	} else {
		res.send(renderedPage).end()
	}
}
