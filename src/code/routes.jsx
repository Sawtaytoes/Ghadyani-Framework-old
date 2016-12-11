import React, { PureComponent, PropTypes } from 'react'
import { Match, Miss, Redirect } from 'react-router'
import { connect } from 'react-redux'
import { redirs, routes } from 'content/route-config'

// Components
import Master from 'layouts/master'

// Actions
import { changeLocation } from 'ducks/location'

class ReduxLocation extends PureComponent {
	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		location: PropTypes.object.isRequired,
	}

	componentWillMount() {
		const { location, dispatch } = this.props
		dispatch(changeLocation(location))
	}

	render() { return (
		<div />
	)}
}

const ConnectedReduxLocation = connect(() => ({}))(ReduxLocation)

export default class Routes extends PureComponent {
	constructor() {
		super()

		this.views = {}
		this.count = 0

		this.redirs = redirs
		this.routes = routes
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
