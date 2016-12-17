// --------------------------------------------------------
// Actions
// --------------------------------------------------------

const LOCATION_CHANGED = 'LOCATION_CHANGED'
const PAGE_META_CHANGED = 'PAGE_META_CHANGED'


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
		type: PAGE_META_CHANGED,
		path
	}
}


// --------------------------------------------------------
// Reducer
// --------------------------------------------------------

import { htmlMeta } from 'utilities/render-full-page-extras'

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

function updateScrollPosition() {
	if (typeof window !== 'undefined') {
		window.scroll(0, 0)
	}
}

export default (state = {}, action) => {
	const { type, path, payload } = action

	switch (type) {
	case PAGE_META_CHANGED:
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
