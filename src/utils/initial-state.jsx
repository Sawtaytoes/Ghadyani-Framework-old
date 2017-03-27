export function getInitialState() {
	return typeof window !== 'undefined' && window.__INITIAL_STATE__
}
