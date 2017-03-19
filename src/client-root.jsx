import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

// Store and Routes
import { store } from 'utils/store'

// Components
import Routes from 'routes'

export default class ClientRoot extends Component {
	render() { return (
		<Provider store={store}>
			<Router>
				<Routes />
			</Router>
		</Provider>
	)}
}
