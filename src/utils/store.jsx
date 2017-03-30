import createBrowserHistory from 'history/createBrowserHistory'
import { compose, applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'

import rootReducer from 'ducks'

const initialState = typeof window !== 'undefined' && window.__INITIAL_STATE__
const history = createBrowserHistory()

const middleware = [
	routerMiddleware(history),
]

const store = compose(applyMiddleware(...middleware))(
	window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore
)(rootReducer, initialState)

module.hot && module.hot.accept('ducks', () => {
	store.replaceReducer(require('ducks'))
})

export {
	history,
	store,
}
