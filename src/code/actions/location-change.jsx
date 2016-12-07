export const LOCATION_CHANGED = 'LOCATION_CHANGED'

export const locationChanged = payload => {
	return {
		type: LOCATION_CHANGED,
		payload,
	}
}
