import React, { PureComponent } from 'react'
import { Match, Miss } from 'react-router'

const isAsyncCapable = typeof window !== 'undefined'
export default class Routes extends PureComponent {
	constructor() {
		super()

		this.views = {}
		this.viewReady = new Set()

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

		return <div />
	}

	renderRoute({ name, pattern, component }) {
		if (pattern) {
			return <Match key={name} exactly pattern={pattern} component={component} />
		} else {
			return <Miss key={name} component={component} />
		}
	}

	renderRoutes() {
		return this.routes.map(route => this.renderRoute(route))
	}

	render() { return (
		<div>{this.renderRoutes()}</div>
	)}
}
