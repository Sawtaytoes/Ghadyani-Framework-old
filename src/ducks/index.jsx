import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

// Reducers
import location from 'ducks/location'
import reRender from 'ducks/re-render'
import tap from 'ducks/tap'

export default combineReducers({
	location,
	tap,
	reRender,
	routing,
})
