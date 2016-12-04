import React, { PureComponent } from 'react'
import { Match, Miss, Redirect } from 'react-router'

// Components
import AsyncComponent from 'components/async-component'
import Master from 'layouts/master'

export default class Routes extends PureComponent {
	constructor() {
		super()

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
			// component: () => <AsyncComponent fileLocation={() => require(`views/${route.name}`)} />,
			component: () => <AsyncComponent fileLocation={`views/${route.name}`} />,
		}))
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
			return <Match
				key={name}
				pattern={pattern}
				exactly={exactly}
				component={component}
			/>
		} else {
			return <Miss
				key={name}
				component={component}
			/>
		}
	}

	render() { return (
		<Master>
			{this.renderRoutes()}
			{this.renderRedirs()}
		</Master>
	)}
}
