import {
	compose,
	applyMiddleware,
	createStore,
	combineReducers,
} from 'redux'

import tapListener from 'reducers/tap/listener'
import tap from 'reducers/tap'

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

tapListener(store)

export default store
