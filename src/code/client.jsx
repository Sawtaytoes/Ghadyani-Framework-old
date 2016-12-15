import React from 'react'
import { render } from 'react-dom'

// Polyfills
import 'react-fastclick'
import 'utilities/polyfills'

// Root Component
import ClientRoot from 'client-root'

// Vars
const RootElement = document.getElementById('root')

render(
	<ClientRoot />
, RootElement)

if (module.hot) {
	module.hot.accept('./client-root', () => {
		const ClientRootHotReload = require('./client-root').default

		render(
			<ClientRootHotReload />
		, RootElement)
	})
}
