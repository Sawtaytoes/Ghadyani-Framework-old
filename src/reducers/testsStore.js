import {
	compose,
	applyMiddleware,
	createStore,
	combineReducers,
} from 'redux'

// Pretty TAP output in the console
import 'tap-dev-tool/register'

import tapListener from 'reducers/tap/listener'
import tap from 'reducers/tap'

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

const onHotReload = () => {
	store.replaceReducer(
		combineReducers(
			require('reducers/tap')
		)
	)
}

module.hot
&& module.hot.accept('reducers', onHotReload)

tapListener(store)

export default store
