import createReducer from 'utils/createReducer'
import navItems from 'content/navItems'
import { htmlMeta } from 'content/pageMeta'


// --------------------------------------------------------
// Actions
// --------------------------------------------------------

const LOCATION_CHANGED = '@@router/LOCATION_CHANGE'
const UPDATE_META_DATA = 'PAGE_META::UPDATE_META_DATA'


// --------------------------------------------------------
// Action Creators
// --------------------------------------------------------

const noMatchNavItemMeta = {
	description: '404 - File Not Found',
	title: '404',
}

const getPathRegEx = (path, parentPath) => (
	new RegExp(`^/${parentPath}${path}$`)
)

const isMatchingNavLink = (link, currentPath, parentPath) => (
	currentPath
	&& getPathRegEx(link, parentPath).test(currentPath)
)

const getPageMetaOnLinkMatch = (navItem, currentPath, parentPath) => (
	isMatchingNavLink(navItem.to, currentPath, parentPath)
	&& ({
		description: navItem.description,
		title: navItem.name,
	})
)

const getMetaFromNavItems = (navItems, currentPath, parentPath = '') => (
	navItems
	.find(navItem => (
		navItem.subitems
		? (
			getMetaFromNavItems(
				navItem.subitems,
				currentPath,
				`${parentPath}${navItem.to}/`
			)
		)
		: (
			getPageMetaOnLinkMatch(
				navItem,
				currentPath,
				parentPath
			)
		)
	))
)

const getPageMeta = currentPath => {
	const navItemMeta = getMetaFromNavItems(navItems, currentPath)

	console.log(navItemMeta);

	if (!navItemMeta) {
		return noMatchNavItemMeta
	}

	if (typeof window === 'undefined') {
		return
	}

	return {
		description: navItemMeta.description,
		title: navItemMeta.name,
	}
}

const updatePageTitle = title => (
	title
	&& (document.title = `${title}${htmlMeta.titlePostfix}`)
)

const updatePageDescription = (description = '') => {
	const descriptionMetaTag = document.querySelector('meta[name=description]')
	descriptionMetaTag && (descriptionMetaTag.content = description)
}

const updateScrollPosition = () => (
	typeof window !== 'undefined'
	&& window.scroll(0, 0)
)

export const updatePageMeta = currentPath => {
	const { description, title } = getPageMeta(currentPath)

	updatePageTitle(title)
	updatePageDescription(description)

	return {
		description,
		title,
		type: UPDATE_META_DATA,
	}
}


// --------------------------------------------------------
// Reducer
// --------------------------------------------------------

export const initialState = {
	currentPath: '/',
	description: '',
	hasPathChanged: false,
	previousPath: '/',
	title: '',
}

const reducer = {
	[UPDATE_META_DATA]: (state, { description, title }) => ({
		...state,
		description,
		title,
	}),

	[LOCATION_CHANGED]: (state, { payload: { pathname } }) => {
		const currentPath = pathname
		const previousPath = state.currentPath

		const hasPathChanged = currentPath !== previousPath

		hasPathChanged && updateScrollPosition()

		const { description, title } = updatePageMeta(currentPath)

		return {
			...state,
			currentPath,
			description,
			hasPathChanged,
			previousPath,
			title,
		}
	},
}

export default createReducer(reducer, initialState)
