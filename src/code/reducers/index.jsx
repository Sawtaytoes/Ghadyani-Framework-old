import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// Reducers
import locationChange from 'reducers/location-change'
import tap from 'reducers/tap'

export default combineReducers({
	locationChange,
	tap,
	routing: routerReducer,
})
