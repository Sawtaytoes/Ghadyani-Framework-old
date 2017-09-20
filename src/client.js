import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

// Polyfills
import 'react-fastclick'
import 'utils/polyfills'

// Root Component
import ClientRoot from 'ClientRoot'

// Vars
const RootElement = document.getElementById('root')

render(
	<AppContainer>
		<ClientRoot />
	</AppContainer>
, RootElement)

module.hot && module.hot.accept('./ClientRoot', () => {
	const ClientRootHotReload = require('./ClientRoot').default

	render(
		<AppContainer>
			<ClientRootHotReload />
		</AppContainer>,
		RootElement
	)
})
