import {
	isDoneProcessing,
	tapParsers,
} from 'reducers/tap/helpers'

import {
	setTapStartTime,
	addTapMessage,
	addTapFailure,
} from 'reducers/tap/actions'

const consoleLogReplacement = ({ dispatch, getState }, consoleLog) => (...args) => {
	const [message] = args

	// if (typeof message !== 'string') { return }

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
		consoleLog.apply(console, args)
	}
}

const listenForTapStrings = store => {
	window.console.log = consoleLogReplacement(store, console.log)
}

export default listenForTapStrings
