import React, { Component } from 'react'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router'

// Store and Routes
import { store } from 'utilities/store'

// Components
import Routes from 'routes'

export default class ClientRoot extends Component {
	render() { return (
		<AppContainer>
			<Provider store={store}>
				<Router>
					<Routes />
				</Router>
			</Provider>
		</AppContainer>
	)}
}
