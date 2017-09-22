import {
	compose,
	applyMiddleware,
	createStore,
	combineReducers,
} from 'redux'

import tap from 'reducers/tap'
import {
	isDoneProcessing,
	tapParsers,
} from 'reducers/tap/helpers'

import {
	setTapStartTime,
	addTapMessage,
	addTapFailure,
} from 'reducers/tap/actions'

// Pretty TAP output in the console
// [Disabled] because it conflicts with `setTimeout`
// import 'tap-dev-tool/register'

const middleware = []

const store = (
	compose(
		applyMiddleware(...middleware)
	)(
		window.devToolsExtension
		? window.devToolsExtension()(createStore)
		: createStore
	)(
		combineReducers({ tap })
	)
)

module.hot
&& (
	module.hot.accept(
		'reducers',
		() => (
			store.replaceReducer(
				combineReducers(require('reducers/tap'))
			)
		)
	)
)

const consoleLog = console.log
window.console.log = function(message) {
	if (isDoneProcessing(store.getState().tap.status)) {
		window.console.log = consoleLog
	}

	else if (message.match(tapParsers.start)) {
		store.dispatch(
			setTapStartTime()
		)
	}

	else if (message.match(tapParsers.message)) {
		store.dispatch(
			addTapMessage(message)
		)
	}

	else if (message.match(tapParsers.failure)) {
		store.dispatch(
			addTapFailure(message)
		)
	}

	else {
		consoleLog.apply(console, arguments)
	}
}

export default store
