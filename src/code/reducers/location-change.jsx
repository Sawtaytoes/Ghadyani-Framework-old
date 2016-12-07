import { htmlMeta } from 'utilities/render-full-page-extras'

// Actions
import { UPDATE_PAGE_META } from 'actions/page-meta'
import { LOCATION_CHANGED } from 'actions/location-change'

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

function getMetaFromNavItems(items, path, itemPathTo = '') {
	return items.some((item) => {
		if (item.subitems) {
			return getMetaFromNavItems(item.subitems, path, `${item.to}/`)
		}

		return changePageMetaOnLinkMatch(item, path, itemPathTo)
	})
}

function updatePageMeta(path) {
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
	case UPDATE_PAGE_META:
		updatePageMeta(path)

		return {
			...state,
			title: pageMeta.title,
			description: pageMeta.description
		}

	case LOCATION_CHANGED: {
		const currentPath = payload.pathname
		const previousPath = state.currentPath
		const pathChanged = currentPath !== previousPath

		updatePageMeta(currentPath)
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
