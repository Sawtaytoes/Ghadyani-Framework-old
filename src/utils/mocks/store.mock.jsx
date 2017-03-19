import {
	compose,
	applyMiddleware,
	createStore,
	combineReducers,
} from 'redux'

const mockStore = (reducer, initialState) => {
	const middlewares = []
	const enhancer = compose(applyMiddleware(...middlewares))
	const store = enhancer(
		window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore
	)(combineReducers({ reducer }), { reducer: initialState })

	const getState = () => store.getState().reducer

	return {
		getState,
		dispatch: store.dispatch,
	}
}

export default mockStore
