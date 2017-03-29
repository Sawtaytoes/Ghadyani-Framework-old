import React, { PureComponent, PropTypes } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

// Components
import SiteLayout from 'layouts/site-layout'
import Home from 'views/home'
import About from 'views/about'
import ReRender from 'views/re-render'

// Actions
import { changeLocation } from 'ducks/location'

class ReduxLocation extends PureComponent {
	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		location: PropTypes.object.isRequired,
	};

	componentWillMount() {
		const { location, dispatch } = this.props
		dispatch(changeLocation(location))
	}

	render() { return <div /> }
}

const ConnectedReduxLocation = connect(() => ({}))(ReduxLocation)

const Routes = () => (
	<SiteLayout>
		<Route exact path="/" component={Home} />
		<Route exact path="/" component={ConnectedReduxLocation} />

		<Route path="/about" component={About} />
		<Route path="/about" component={ConnectedReduxLocation} />

		<Route path="/re-render" component={ReRender} />
		<Route path="/re-render" component={ConnectedReduxLocation} />
	</SiteLayout>
)

export default Routes
