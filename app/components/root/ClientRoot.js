import React from 'react'
import { ConnectedRouter as Router } from 'react-router-redux'
import { Provider } from 'react-redux'

import AppRoot from 'components/root/AppRoot'
import { history, store } from 'reducers/store'

const ClientRoot = () => (
	<Provider store={store}>
		<Router history={history}>
			<AppRoot />
		</Router>
	</Provider>
)

export default ClientRoot
