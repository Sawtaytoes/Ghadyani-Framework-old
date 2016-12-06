export const UPDATE_PAGE_META = 'UPDATE_PAGE_META'

export const updatePageMeta = path => {
	return {
		type: UPDATE_PAGE_META,
		path
	}
}
