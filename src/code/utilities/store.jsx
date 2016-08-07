import { compose, applyMiddleware, createStore } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import rootReducer from 'reducers'
import { getInitialState } from 'utilities/initial-state'

const initialState = getInitialState()
const history = createBrowserHistory()

let middlewares = []

if (process.env.NODE_ENV === `development`) {
	middlewares.push(
		require('redux-thunk').default,
		require(`redux-logger`)({
			diff: true,
			logErrors: true
		})
	)
}

const store = compose(applyMiddleware(...middlewares))
	(window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)
	(rootReducer, initialState)

module.hot && module.hot.accept('reducers', () => {
	store.replaceReducer(require('reducers'))
})

syncHistoryWithStore(history, store)

export {
	history,
	store,
}
