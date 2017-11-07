import PropTypes from 'prop-types'
import React from 'react'
import { Provider } from 'react-redux'
import { StaticRouter as Router } from 'react-router-dom'

import AppRoot from 'components/root/AppRoot'

const ServerRoot = ({ context, location, store }) => (
	<Provider store={store}>
		<Router
			location={location}
			context={context}
		>
			<AppRoot />
		</Router>
	</Provider>
)

ServerRoot.propTypes = {
	context: PropTypes.object.isRequired,
	location: PropTypes.string.isRequired,
	store: PropTypes.object.isRequired,
}

export default ServerRoot
