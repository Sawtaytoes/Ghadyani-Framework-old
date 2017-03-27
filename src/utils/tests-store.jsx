import {
	compose,
	applyMiddleware,
	createStore,
	combineReducers,
} from 'redux'

// Reducers
import tap from 'ducks/tap'

// Actions
import {
	TAP_START_REGEX,
	TAP_MESSAGE_REGEX,
	TAP_FAILURE_REGEX,

	setTapStartTime,
	addTapMessage,
	addTapFailure,

	getInitialState as tapInitialState,
} from 'ducks/tap'

// Pretty TAP output in the console
import 'tap-dev-tool/register'

const middlewares = []

const store = compose(applyMiddleware(...middlewares))(
	window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore
)(combineReducers({ tap }), { tap: tapInitialState()})

module.hot && module.hot.accept('ducks', () => {
	store.replaceReducer(combineReducers(require('ducks/tap')))
})

const log = console.log
window.console.log = function(message) {
	log.apply(console, arguments)

	// Is valid TAP message
	if (store.getState().tap.testsComplete) {
		window.console.log = log

	} else if (message.search(TAP_START_REGEX) === 0) {
		store.dispatch(setTapStartTime())

	} else if (message.search(TAP_MESSAGE_REGEX) === 0) {
		store.dispatch(addTapMessage(message))

	} else if (message.search(TAP_FAILURE_REGEX) === 0) {
		store.dispatch(addTapFailure(message))
	}
}

export default store
