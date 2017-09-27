import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { hydrate, render } from 'react-dom'

// Compatibility Polyfills
import 'react-fastclick'
import 'utils/polyfills'

import ClientRoot from 'ClientRoot'

const isProd = process.env.NODE_ENV === 'production'
const rootElement = document.getElementById('root')

Promise.resolve(
	isProd
	? hydrate
	: render
)
.then(domRender => (
	domRender(
		(
			<AppContainer>
				<ClientRoot />
			</AppContainer>
		),
		rootElement
	)
))

const onHotReload = () => {
	const ClientRootHotReload = require('./ClientRoot').default

	render(
		(
			<AppContainer>
				<ClientRootHotReload />
			</AppContainer>
		),
		rootElement
	)
}

module.hot
&& module.hot.accept('./ClientRoot', onHotReload)
