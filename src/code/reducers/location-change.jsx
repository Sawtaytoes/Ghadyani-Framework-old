import { htmlMeta } from 'utilities/render-full-page-extras'

// Actions
import { UPDATE_PAGE_META } from 'actions'

// Content
import navItems from 'content/nav-items'

let pageMeta = {}

const changePageMetaOnLinkMatch = (item, path, itemPathTo) => {
	let re = new RegExp(`^/${itemPathTo}${item.to}$`),
		linkMatch = re.test(path)

	if (linkMatch) {
		pageMeta = {
			title: item.name,
			description: item.description
		}
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
		pageMeta = {
			title: '404',
			description: '404 - File Not Found'
		}
	}

	if (typeof window === 'undefined') {
		return
	}

	let { title, description } = pageMeta
	title && (document.title = `${title}${htmlMeta.titlePostfix}`)
	description && (document.querySelector('meta[name=description]').content = description)
}

function updateScrollPosition() {
	if (typeof window !== 'undefined') {
		window.scroll(0, 0)
	}
}

export default (state = {}, action) => {
	let { type, path, payload } = action

	switch (type) {
	case UPDATE_PAGE_META:
		updatePageMeta(path)

		return {
			...state,
			title: pageMeta.title,
			description: pageMeta.description
		}

	case '@@router/LOCATION_CHANGE':
		let currentPath = payload.pathname,
			previousPath = state.currentPath,
			pathChanged = currentPath !== previousPath

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

	default:
		return state
	}
}
