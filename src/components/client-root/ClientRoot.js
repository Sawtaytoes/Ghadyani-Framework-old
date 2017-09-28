import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter as Router } from 'react-router-redux'

import { history, store } from 'reducers/store'
import Pages from 'components/pages'

const ClientRoot = () => (
	<Provider store={store}>
		<Router history={history}>
			<Pages />
		</Router>
	</Provider>
)

export default ClientRoot
