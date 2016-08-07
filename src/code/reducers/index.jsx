import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import locationChange from 'reducers/location-change'

export default combineReducers({
	locationChange,
	routing: routerReducer
})
