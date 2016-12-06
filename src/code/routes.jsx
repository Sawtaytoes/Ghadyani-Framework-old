import React, { PureComponent } from 'react'
import { Match, Miss, Redirect } from 'react-router'
import { connect } from 'react-redux'

// Components
import Master from 'layouts/master'

// Actions
import { locationChanged } from 'actions/location-change'

class ReduxLocation extends PureComponent {
	componentWillMount() {
		const { location, dispatch } = this.props
		dispatch(locationChanged(location))
	}

	render() { return (
		<div />
	)}
}

const ConnectedReduxLocation = connect(() => ({}))(ReduxLocation)

const isAsyncCapable = typeof window !== 'undefined'
export default class Routes extends PureComponent {
	constructor() {
		super()

		this.views = {}

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

	loadView(fileName) {
		return isAsyncCapable ? this.asyncLoader(fileName) : this.syncLoader(fileName)
	}

	syncLoader(fileName) {
		const View = require(`./views/${fileName}`).default
		return <View />
	}

	asyncLoader(fileName) {
		const storedView = this.views[fileName]
		if (storedView) {
			delete this.views[fileName]
			return storedView
		}

		new Promise(resolve => require.ensure([], () => {
			resolve(require(`./views/${fileName}`).default)
		}))
		.then(View => this.views[fileName] = <View />)
		.then(() => this.forceUpdate())
		.catch(err => {
			console.error(err)
			throw new Error(err)
		})

		return <div />
	}

	renderRedirs() {
		return this.redirs.map(redir => this.renderRedir(redir))
	}

	renderRedir({ pattern, exactly, to }) {
		return <Match
			key={pattern}
			pattern={pattern}
			exactly={exactly}
			render={props => <Redirect to={to(props)} />}
		/>
	}

	renderRoutes() {
		return this.routes.map(route => this.renderRoute(route))
	}

	renderRoute({ name, pattern, exactly, component }) {
		if (pattern) {
			return [
				<Match
					key={name}
					pattern={pattern}
					exactly={exactly}
					component={component}
				/>,
				<Match
					key={`${name}redux`}
					pattern={pattern}
					exactly={exactly}
					component={ConnectedReduxLocation}
				/>,
			]
		} else {
			return [
				<Miss
					key={name}
					component={component}
				/>,
				<Miss
					key={`${name}redux`}
					component={ConnectedReduxLocation}
				/>,
			]
		}
	}

	render() { return (
		<Master>
			{this.renderRoutes()}
			{this.renderRedirs()}
		</Master>
	)}
}
