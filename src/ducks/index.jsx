import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

// Reducers
import location from 'ducks/location'

export default combineReducers({
	location,
	routing,
})
