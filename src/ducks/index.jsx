import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import pageMeta from 'ducks/page-meta'

export default combineReducers({
	pageMeta,
	router,
})
