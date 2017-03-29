// --------------------------------------------------------
// Actions
// --------------------------------------------------------

const TOGGLE_VALUE = 'RERENDER:TOGGLE_VALUE'


// --------------------------------------------------------
// Action Creators
// --------------------------------------------------------

export const toggleValue = () => {
	return {
		type: TOGGLE_VALUE,
	}
}


// --------------------------------------------------------
// Reducer
// --------------------------------------------------------

export const initialState = {
	value: false,
}

export default (state = initialState, action) => {
	const { type } = action

	switch (type) {
	case TOGGLE_VALUE:
		return {
			...state,
			value: !state.value,
		}

	default:
		return state
	}
}
