import React from 'react'
import { compose, createStore } from 'redux'
import { renderToString } from 'react-dom/server'

import 'utils/polyfills'

import renderSite from 'renderers/renderSite'
import ServerRoot from 'components/root/ServerRoot'
import { rootReducer } from 'reducers'
import { updatePageMeta } from 'reducers/pageMeta'

module.exports = (req, res) => {
	const context = {}
	const store = compose()(createStore)(rootReducer)

	const renderedContent = (
		renderToString(
			<ServerRoot
				context={context}
				location={req.url}
				store={store}
			/>
		)
	)

	store.dispatch(
		updatePageMeta(req.url)
	)

	const renderedPage = renderSite(renderedContent, store.getState())

	if (context.url) {
		res
		.writeHead(302, { Location: context.url })
		.end()

	} else {
		res
		.send(renderedPage)
		.end()
	}
}
