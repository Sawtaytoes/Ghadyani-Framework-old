import {
	isDoneProcessing,
	tapParsers,
} from 'reducers/tap/helpers'

import {
	setTapStartTime,
	addTapMessage,
	addTapFailure,
} from 'reducers/tap/actions'

export const consoleLogReplacement = ({ dispatch, getState }, windowConsoleLog) => (...args) => {
	const [message] = args

	// if (typeof message !== 'string') { return }

	if (isDoneProcessing(getState().tap.status)) {
		window.console.log = windowConsoleLog
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
		windowConsoleLog.apply(console, args)
	}
}

const listenForTapStrings = store => {
	window.console.log = consoleLogReplacement(store, console.log)
}

export default listenForTapStrings
