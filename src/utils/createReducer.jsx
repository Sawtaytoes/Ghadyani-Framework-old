export default (reducer, initialState) => (state = initialState, action) => (
	reducer[action.type]
	? reducer[action.type](state, action)
	: state
)
