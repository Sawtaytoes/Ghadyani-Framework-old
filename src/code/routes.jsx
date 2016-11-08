import { Master } from './layouts'

const redirectRoute = (route, nextState, replace) => replace(route)

const routes = {
	path: '/',
	component: Master,
	indexRoute: {
		getComponent: (location, cb) => {
			require.ensure([], (require) => cb(null, require('./views/home')))
		},
	},
	childRoutes: [{

		// Redirects
		path: '/redirectTest',
		onEnter: redirectRoute.bind(null, '/')
	}, {

		// Remove Trailing Slash
		path: '**/',
		onEnter: ({ location }, replace) => replace(location.pathname.slice(0, -1))
	}, {

		// Routes
		path: '/about',
		getComponent: (location, cb) => {
			require.ensure([], (require) => cb(null, require('./views/about')))
		},
	}, {

		path: '*',
		getComponent: (location, cb) => {
			require.ensure([], (require) => cb(null, require('./views/404')))
		},
	}],
}

export default routes
