import {
	isDoneProcessing,
	tapParsers,
} from 'reducers/tap/helpers'

import {
	setTapStartTime,
	addTapMessage,
	addTapFailure,
} from 'reducers/tap/actions'

const listenForTapStrings = ({ dispatch, getState }) => {
	const consoleLog = console.log
	window.console.log = function(message) {
		if (typeof message !== 'string') { return }

		if (isDoneProcessing(getState().tap.status)) {
			window.console.log = consoleLog
		}

		else if (message.match(tapParsers.start)) {
			dispatch(
				setTapStartTime()
			)
		}

		else if (message.match(tapParsers.message)) {
			dispatch(
				addTapMessage(message)
			)
		}

		else if (message.match(tapParsers.failure)) {
			dispatch(
				addTapFailure(message)
			)
		}

		else {
			consoleLog.apply(console, arguments)
		}
	}
}

export default listenForTapStrings
