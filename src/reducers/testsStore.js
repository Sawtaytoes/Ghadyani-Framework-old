import {
	compose,
	applyMiddleware,
	createStore,
	combineReducers,
} from 'redux'

import listenForTapStrings from 'reducers/tap/middleware'
import tap from 'reducers/tap'

// Pretty TAP output in the console
// [Disabled] because it conflicts with `setTimeout`
// import 'tap-dev-tool/register'

const middleware = [
	listenForTapStrings,
]

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

export default store
