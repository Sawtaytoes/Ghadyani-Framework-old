export const tapColor = {
	fail: 'crimson',
	info: 'dimgrey',
	pass: 'green',
}

export const tapMessageType = {
	header: 'header',
	pass: 'pass',
	fail: 'fail',
}

export const tapStatus = {
	running: 'running',
	done: 'done',
}

export const isDoneProcessing = status => status === tapStatus.done

export const tapParsers = {
	header: /^()(.+)$/,
	failure: /^((\s{4}(operator|expected|actual|stack):)|\s{6})[ ]*(.+)$/,
	message: /^((ok|not ok|(# (ok|tests|pass|fail)?))[ ]*)(.+)$/,
	start: /^TAP version \d+$/,
	test: /^(\d+)[ ](.+)$/,
}
