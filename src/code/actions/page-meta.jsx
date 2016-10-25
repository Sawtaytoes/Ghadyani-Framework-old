export const UPDATE_PAGE_META = 'UPDATE_PAGE_META'

export function updatePageMeta(path) {
	return {
		type: UPDATE_PAGE_META,
		path
	}
}
