import React, { PureComponent } from 'react'
import { Match, Miss, Redirect } from 'react-router'

const isAsyncCapable = typeof window !== 'undefined'
export default class Routes extends PureComponent {
	constructor() {
		super()

		this.views = {}
		this.viewReady = new Set()

		this.redirs = [{
			pattern: '/redirectTest',
			to: '/',
		}, {
			pattern: '**/',
			to: ({ location }) => location.pathname.slice(0, -1),
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

	loadView(fileName) {
		return isAsyncCapable ? this.asyncLoader(fileName) : this.syncLoader(fileName)
	}

	syncLoader(fileName) {
		const View = require(`./views/${fileName}`)
		return <View />
	}

	asyncLoader(fileName) {
		if (this.viewReady.has(fileName)) {
			this.viewReady.delete(fileName)
			return this.views[fileName]
		}

		new Promise(resolve => require.ensure([], () => {
			resolve(require(`./views/${fileName}`))
		}))
		.then(View => this.views[fileName] = <View />)
		.then(() => this.viewReady.add(fileName))
		.then(() => this.forceUpdate())
		.catch(err => {
			console.error(err)
			throw err
		})

		return <div />
	}

	renderRedirs() {
		return this.redirs.map(redir => this.renderRedir(redir))
	}

	renderRedir({ pattern, to }) {
		return <Match key={pattern} exactly pattern={pattern} render={props => <Redirect to={to(props)} />} />
	}

	renderRoutes() {
		return this.routes.map(route => this.renderRoute(route))
	}

	renderRoute({ name, pattern, component }) {
		if (pattern) {
			return <Match key={name} exactly pattern={pattern} component={component} />
		} else {
			return <Miss key={name} component={component} />
		}
	}

	render() { return (
		<div>
			{this.renderRoutes()}
			{this.renderRedirs()}
		</div>
	)}
}
