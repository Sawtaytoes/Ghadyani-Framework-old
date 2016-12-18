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
	componentLoader: (cb, name) => require.ensure([], require => {console.debug('[require]', name); cb(require('../views/home')); console.debug('[require-END]', name)})
}, {
	name: 'about',
	pattern: '/about',
	componentLoader: (cb, name) => require.ensure([], require => {console.debug('[require]', name); cb(require('../views/about')); console.debug('[require-END]', name)})
}, {
	name: '404',
	componentLoader: (cb, name) => require.ensure([], require => {console.debug('[require]', name); cb(require('../views/404')); console.debug('[require-END]', name)})
}]

console.error('kevin')
