import Inferno from 'inferno'
import Component from 'inferno-component'
import { Route } from 'inferno-router'

// Components
import Master from 'layouts/master'

// const isAsyncCapable = typeof window !== 'undefined'
export default class Routes extends Component {
	constructor() {
		super()

		// this.views = {}

		this.redirs = [{
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

		this.routes = [{
			name: 'home',
			pattern: '/',
			exactly: true,
		}, {
			name: 'about',
			pattern: '/about',
		}, {
			name: '404',
		}].map(route => ({
			...route,
			component: this.loadView.bind(this, route.name),
		}))
	}

	// loadView(fileName) {
	// 	return isAsyncCapable ? this.asyncLoader(fileName) : this.syncLoader(fileName)
	// }

	// syncLoader(fileName) {
	// 	const View = require(`./views/${fileName}`).default
	// 	return <View />
	// }

	asyncLoader(fileName) {
		// const storedView = this.views[fileName]
		// if (storedView) {
		// 	delete this.views[fileName]
		// 	return storedView
		// }

		return new Promise(resolve => require.ensure([], () => {
			resolve(require(`./views/${fileName}`).default)
		}))
		// .then(View => this.views[fileName] = <View />)
		// .then(() => this.forceUpdate())
		// .catch(err => {
		// 	console.error(err)
		// 	throw new Error(err)
		// })

		// return <div />
	}

	// renderRedirs() {
	// 	return this.redirs.map(redir => this.renderRedir(redir))
	// }

	// renderRedir({ pattern, exactly, to }) {
	// 	return <Match
	// 		key={pattern}
	// 		pattern={pattern}
	// 		exactly={exactly}
	// 		render={props => <Redirect to={to(props)} />}
	// 	/>
	// }

	// renderRoutes() {
	// 	return this.routes.map(route => this.renderRoute(route))
	// }

	// renderRoute({ name, pattern, exactly, component }) {
	// 	if (pattern) {
	// 		return <Match
	// 			key={name}
	// 			pattern={pattern}
	// 			exactly={exactly}
	// 			component={component}
	// 		/>
	// 	} else {
	// 		return <Miss
	// 			key={name}
	// 			component={component}
	// 		/>
	// 	}
	// }

	render() { return (
		<Master>
			<Route path="/" async={this.asyncLoader.bind('home')} />
			{/*this.renderRoutes()*/}
			{/*this.renderRedirs()*/}
		</Master>
	)}
}
