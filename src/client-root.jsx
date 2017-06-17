import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter as Router } from 'react-router-redux'

import { history, store } from 'utils/store'
import Pages from 'pages'

export default class ClientRoot extends Component {
	render() { return (
		<Provider store={store}>
			<Router history={history}>
				<Pages />
			</Router>
		</Provider>
	)}
}
