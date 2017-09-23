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

const stateObserver = store => observer => (
	store.subscribe(
		() => {
			observer.next(
				store.getState().tap.status
			)
		}
	)
)

const consoleLogObserver = observer => {
	window.console.log = (...args) => observer.next(args)
}

const tapListener = store => {
	const state$ = (
		Rx.Observable
		.create(stateObserver(store))
	)

	const stateTapStatus$ = (
		state$
		.takeWhile(status => !isDoneProcessing(status))
	)

	const consoleLog$ = (
		Rx.Observable
		.create(consoleLogObserver)
		.takeUntil(state$.filter(isDoneProcessing))
		.share()
	)

	const consoleLogWithoutTapOutput$ = (
		consoleLog$
		.filter(([message]) => !(
			typeof message === 'string'
			&& (
				message.match(tapParsers.start)
				|| message.match(tapParsers.message)
				|| message.match(tapParsers.failure)
			)
		))
	)

	const consoleLogStrings$ = (
		consoleLog$
		.map(([message]) => message)
		.filter(message => typeof message === 'string')
	)

	const tapStart$ = (
		consoleLogStrings$
		.filter(message => message.match(tapParsers.start))
	)

	const tapMessage$ = (
		consoleLogStrings$
		.filter(message => message.match(tapParsers.message))
	)

	const tapFailure$ = (
		consoleLogStrings$
		.filter(message => message.match(tapParsers.failure))
	)

	stateTapStatus$.subscribe()
	consoleLogWithoutTapOutput$.subscribe({
		next: args => windowConsoleLog(...args),
		complete: () => window.console.log = windowConsoleLog,
	})

	tapStart$.subscribe(() => store.dispatch(setTapStartTime()))
	tapMessage$.subscribe(message => store.dispatch(addTapMessage(message)))
	tapFailure$.subscribe(message => store.dispatch(addTapFailure(message)))
}

export default tapListener
