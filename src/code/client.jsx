import React from 'react'
import { render } from 'react-dom'

// Root Component
import ClientRoot from 'client-root'

// Polyfills
import 'react-fastclick'
import 'utilities/polyfills'

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
