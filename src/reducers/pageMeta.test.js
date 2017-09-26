import test from 'tape-catch'

import pageMetaReducer, {
	initialState,
	updatePageMeta,
} from './pageMeta'

const navItems = [{
	description: "Get ready to get rocked!",
	displayInHeader: true,
	name: 'Home',
	to: '',
}, {
	description: "All about nothing.",
	displayInHeader: true,
	name: 'About',
	to: 'about',
}, {
	description: "TEST ALL THE THINGS!",
	name: 'Unit Tests',
	to: 'tests',
}, {
	description: "404 - Page Not Found",
	name: 'Page Not Found',
	to: '404',
}]

const getPathWithoutLeadingSlash = path => path.replace(/^\//, '')

test('Page Meta: Update Page Meta from `/`', t => {
	const currentPath = '/'

	const pathWithoutSlash = getPathWithoutLeadingSlash(currentPath)
	const navItem = navItems.find(({ to }) => to === pathWithoutSlash)

	const action = updatePageMeta(currentPath)

	const { description, name } = (
		pageMetaReducer(
			initialState,
			action
		)
	)

	t.equal(
		description,
		navItem.description,
		"Page description was updated"
	)

	t.equal(
		name,
		navItem.name,
		"Page name was updated"
	)

	t.end()
})

test('Page Meta: Update Page Meta from `/about`', t => {
	const currentPath = '/about'

	const pathWithoutSlash = getPathWithoutLeadingSlash(currentPath)
	const navItem = navItems.find(({ to }) => to === pathWithoutSlash)

	const action = updatePageMeta(currentPath)

	const { description, name } = (
		pageMetaReducer(
			initialState,
			action
		)
	)

	t.equal(
		description,
		navItem.description,
		"Page description was updated"
	)

	t.equal(
		name,
		navItem.name,
		"Page name was updated"
	)

	t.end()
})

test('Page Meta: Update Page Meta from `/no-match`', t => {
	const currentPath = '/no-match'

	const navItem = navItems.find(({ to }) => to === '404')

	const action = updatePageMeta(currentPath)

	const { description, name } = (
		pageMetaReducer(
			initialState,
			action
		)
	)

	t.equal(
		description,
		navItem.description,
		"Page description was updated"
	)

	t.equal(
		name,
		navItem.name,
		"Page name was updated"
	)

	t.end()
})

test('Page Meta: Update Page Meta from Many Actions', t => {
	const finalPath = '/tests'

	const pathWithoutSlash = getPathWithoutLeadingSlash(finalPath)
	const navItem = navItems.find(({ to }) => to === pathWithoutSlash)

	const actions = [
		updatePageMeta('/no-match'),
		updatePageMeta('/'),
		updatePageMeta(finalPath),
	]

	const { description, name } = (
		actions
		.reduce(
			pageMetaReducer,
			initialState
		)
	)

	t.equal(
		description,
		navItem.description,
		"Page description was updated"
	)

	t.equal(
		name,
		navItem.name,
		"Page name was updated"
	)

	t.end()
})
