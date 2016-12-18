export const redirs = [{
	pattern: '/redirect',
	to: '/',
}, {
	pattern: '**/',
	to: ({ location }) => location.pathname.slice(0, -1),
	exactly: true,
}].map(redir => {
	const { to } = redir
	return {
		...redir,
		to: typeof to !== 'function' ? () => to : to
	}
})

export const routes = [{
	name: 'home',
	pattern: '/',
	exactly: true,
	componentLoader: cb => cb(System.import('../views/home')),
}, {
	name: 'about',
	pattern: '/about',
	componentLoader: cb => cb(System.import('../views/about')),
}, {
	name: '404',
	componentLoader: cb => cb(System.import('../views/404')),
}]
