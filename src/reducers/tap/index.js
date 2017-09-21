import { combineReducers } from 'redux'

import failures from './failures'
import stats from './stats'
import status from './status'
import tests from './tests'
import timer from './timer'

export default combineReducers({
	failures,
	stats,
	status,
	tests,
	timer,
})
