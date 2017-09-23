import Rx from 'rxjs/Rx'

import {
	isDoneProcessing,
	tapParsers,
} from 'reducers/tap/helpers'

import {
	setTapStartTime,
	addTapMessage,
	addTapFailure,
} from 'reducers/tap/actions'

const windowConsoleLog = window.console.log

export const stateObserver = store => observer => (
	store.subscribe(
		() => {
			observer.next(
				store.getState().tap.status
			)
		}
	)
)

export const consoleLogObserver = observer => {
	window.console.log = (...args) => observer.next(args)
}

const tapListener = store => {
	const state$ = (
		Rx.Observable
		.create(stateObserver(store))
	)

	const [tapMessage$, consoleLog$] = (
		Rx.Observable
		.create(consoleLogObserver)
		.takeUntil(state$.filter(isDoneProcessing))
		.share()
		.partition(([message]) => (
			typeof message === 'string'
			&& (
				message.match(tapParsers.start)
				|| message.match(tapParsers.message)
				|| message.match(tapParsers.failure)
			)
		))
	)

	const tapMessageString$ = (
		tapMessage$
		.map(([message]) => message)
	)

	state$
	.takeWhile(status => !isDoneProcessing(status))
	.subscribe()

	consoleLog$
	.subscribe({
		next: args => windowConsoleLog(...args),
		complete: () => window.console.log = windowConsoleLog,
	})

	tapMessageString$
	.filter(message => message.match(tapParsers.start))
	.subscribe(() => store.dispatch(setTapStartTime()))

	tapMessageString$
	.filter(message => message.match(tapParsers.message))
	.subscribe(message => store.dispatch(addTapMessage(message)))

	tapMessageString$
	.filter(message => message.match(tapParsers.failure))
	.subscribe(message => store.dispatch(addTapFailure(message)))
}

export default tapListener
