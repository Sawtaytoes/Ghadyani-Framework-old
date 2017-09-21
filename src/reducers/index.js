import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import pageMeta from 'reducers/pageMeta'

export default combineReducers({
	pageMeta,
	router,
})
