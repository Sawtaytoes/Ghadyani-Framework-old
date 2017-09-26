import { LOCATION_CHANGE } from 'react-router-redux'

import createReducer from 'utils/createReducer'
import navItems from 'content/navItems'
import { htmlMeta } from 'content/pageMeta'


// --------------------------------------------------------
// Actions
// --------------------------------------------------------

const UPDATE_META_DATA = 'PAGE_META::UPDATE_META_DATA'


// --------------------------------------------------------
// Action Creators
// --------------------------------------------------------

const hasDocument = typeof document !== 'undefined'

const getPathRegEx = (path, parentPath) => (
	new RegExp(`^/${parentPath}${path}$`)
)

const isMatchingNavLink = (link, currentPath, parentPath) => (
	currentPath
	&& getPathRegEx(link, parentPath).test(currentPath)
)

const getPageMetaOnLinkMatch = (navItem, currentPath, parentPath) => (
	isMatchingNavLink(navItem.to, currentPath, parentPath)
	&& navItem
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

const noMatchNavItemMeta = navItems.find(({ to }) => to === '404')

const getPageMeta = currentPath => (
	getMetaFromNavItems(navItems, currentPath)
	|| noMatchNavItemMeta
)

const updatePageTitle = name => (
	hasDocument
	&& (document.title = `${name}${htmlMeta.titlePostfix}`)
)

const updatePageDescription = (description = '') => {
	const descriptionMetaTag = (
		hasDocument
		&& document.querySelector('meta[name=description]')
	)

	descriptionMetaTag && (descriptionMetaTag.content = description)
}

const updateScrollPosition = () => (
	typeof window !== 'undefined'
	&& window.scroll(0, 0)
)

export const updatePageMeta = currentPath => {
	const { description, name } = getPageMeta(currentPath)

	updatePageTitle(name)
	updatePageDescription(description)

	return {
		description,
		name,
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
	name: '',
}

const reducerActions = {
	[UPDATE_META_DATA]: (state, { description, name }) => ({
		...state,
		description,
		name,
	}),

	[LOCATION_CHANGE]: (state, { payload: { pathname } }) => {
		const currentPath = pathname
		const previousPath = state.currentPath

		const hasPathChanged = currentPath !== previousPath

		hasPathChanged && updateScrollPosition()

		const { description, name } = updatePageMeta(currentPath)

		return {
			...state,
			currentPath,
			description,
			hasPathChanged,
			previousPath,
			name,
		}
	},
}

export default createReducer(reducerActions, initialState)
