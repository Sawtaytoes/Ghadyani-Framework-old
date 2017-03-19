import { compose, applyMiddleware, createStore } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'
import createBrowserHistory from 'history/createBrowserHistory'

import rootReducer from 'ducks'
import { getInitialState } from 'utilities/initial-state'

const initialState = getInitialState()
const history = createBrowserHistory()

let middlewares = []

const store = compose(applyMiddleware(...middlewares))(
	window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore
)(rootReducer, initialState)

module.hot && module.hot.accept('ducks', () => {
	store.replaceReducer(require('ducks'))
})

syncHistoryWithStore(history, store)

export {
	history,
	store,
}
