import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import pageMeta from 'ducks/pageMeta'

export default combineReducers({
	pageMeta,
	router,
})
