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
			console.log 'here 1'
			require.ensure [], (require) =>
				console.log 'here 2'
				cb null, require './views/404'
	]
