import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { browserHistory, Router } from 'react-router'

// Store and Routes
import { store } from 'utilities/store'

export default class Root extends Component {
	render() { return (
		<Provider store={store}>
			<Router history={browserHistory} {...this.props.renderProps} />
		</Provider>
	)}
}
