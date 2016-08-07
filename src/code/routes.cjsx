`import { Master } from './layouts'`

redirectRoute = (route, nextState, replace) =>
	replace route

module.exports =
	path: '/'
	component: Master
	childRoutes: [

		## Redirects

		## Remove Trailing Slash
		path: '**/'
		onEnter: ({ location }, replace) =>
			replace(location.pathname.slice 0, -1)
	,

		## Routes
		path: '*'
		getComponent: (location, cb) =>
			require.ensure [], (require) =>
				cb null, require './views/404'
	]
