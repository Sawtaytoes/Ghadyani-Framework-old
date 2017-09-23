import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import pageMeta from 'reducers/pageMeta'

export const rootEpic = combineEpics()

export const rootReducer = combineReducers({
	pageMeta,
	router,
})
