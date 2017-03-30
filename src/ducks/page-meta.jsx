// --------------------------------------------------------
// Actions
// --------------------------------------------------------

const LOCATION_CHANGED = '@@router/LOCATION_CHANGE'
const CHANGE_META_DATA = 'PAGE_META:CHANGE_META_DATA'


// --------------------------------------------------------
// Action Creators
// --------------------------------------------------------

export const changeLocation = payload => {
	return {
		type: LOCATION_CHANGED,
		payload,
	}
}

export const updatePageMeta = path => {
	return {
		type: CHANGE_META_DATA,
		path
	}
}


// --------------------------------------------------------
// Reducer
// --------------------------------------------------------

import { htmlMeta } from 'utils/render-full-page-extras'

// Content
import navItems from 'content/nav-items'

const pageMeta = {}

const changePageMetaOnLinkMatch = (item, path, itemPathTo) => {
	const re = new RegExp(`^/${itemPathTo}${item.to}$`),
		linkMatch = re.test(path)

	if (linkMatch) {
		pageMeta.title = item.name
		pageMeta.description = item.description
	}

	return linkMatch
}

const getMetaFromNavItems = (items, path, itemPathTo = '') => {
	return items.some((item) => {
		if (item.subitems) {
			return getMetaFromNavItems(item.subitems, path, `${item.to}/`)
		}

		return changePageMetaOnLinkMatch(item, path, itemPathTo)
	})
}

const changePageMeta = (path) => {
	if (!getMetaFromNavItems(navItems, path)) {
		pageMeta.title = '404'
		pageMeta.description = '404 - File Not Found'
	}

	if (typeof window === 'undefined') {
		return
	}

	const { title, description } = pageMeta
	title && (document.title = `${title}${htmlMeta.titlePostfix}`)
	if (description) {
		const descriptionMetaTag = document.querySelector('meta[name=description]')
		descriptionMetaTag && (descriptionMetaTag.content = description)
	}
}

const updateScrollPosition = () => {
	if (typeof window !== 'undefined') {
		window.scroll(0, 0)
	}
}

export const getInitialState = () => ({
	currentPath: '/',
	previousPath: '/',
	pathChanged: false,
	title: '',
	description: '',
})

export default (state = getInitialState(), action) => {
	const { type, path, payload } = action

	switch (type) {
	case CHANGE_META_DATA:
		changePageMeta(path)

		return {
			...state,
			title: pageMeta.title,
			description: pageMeta.description
		}

	case LOCATION_CHANGED: {
		const currentPath = payload.pathname
		const previousPath = state.currentPath
		const pathChanged = currentPath !== previousPath

		changePageMeta(currentPath)
		pathChanged && updateScrollPosition()

		return {
			...state,
			currentPath,
			previousPath,
			pathChanged,
			title: pageMeta.title,
			description: pageMeta.description
		}
	}

	default:
		return state
	}
}
