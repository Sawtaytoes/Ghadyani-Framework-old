import { combineReducers } from 'redux'

import failures from './failures'
import messages from './messages'
import stats from './stats'
import status from './status'
import timer from './timer'

export default combineReducers({
	failures,
	messages,
	stats,
	status,
	timer,
})
