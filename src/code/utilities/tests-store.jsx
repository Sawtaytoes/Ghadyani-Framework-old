import { compose, applyMiddleware, createStore, combineReducers } from 'redux'

// Reducers
import tap from 'ducks/tap'

// Actions
import {
	setTapStartTime,
	addTapMessage,
} from 'ducks/tap'

let middlewares = []

const store = compose(applyMiddleware(...middlewares))(
	window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore
)(combineReducers({ tap }), { tap: { messages: [] }})

module.hot && module.hot.accept('reducers', () => {
	store.replaceReducer(combineReducers(require('ducks/tap')))
})

const log = console.log
window.console.log = function(message) {
	store.dispatch(addTapMessage(message))
	log.apply(console, arguments)
}

store.dispatch(setTapStartTime())

// Initialize `console.log` Tap Output now that we're listening for updates
import 'tap-dev-tool/register'

export { store }
