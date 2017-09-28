import createBrowserHistory from 'history/createBrowserHistory'
import { compose, applyMiddleware, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { routerMiddleware } from 'react-router-redux'

import { rootEpic, rootReducer } from 'reducers'

const initialState = typeof window !== 'undefined' && window.__INITIAL_STATE__
const history = createBrowserHistory()

const epicMiddleware = createEpicMiddleware(rootEpic)

const middleware = [
	epicMiddleware,
	routerMiddleware(history),
]

const store = (
	compose(
		applyMiddleware(...middleware)
	)(
		window.devToolsExtension
		? window.devToolsExtension()(createStore)
		: createStore
	)(
		rootReducer,
		initialState
	)
)

const onHotReload = () => {
	const { rootEpic, rootReducer } = require('reducers')

	epicMiddleware.replaceEpic(rootEpic)
	store.replaceReducer(rootReducer)
}

module.hot
&& module.hot.accept('reducers', onHotReload)

export {
	history,
	store,
}
