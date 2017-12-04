import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from 'components/root/ClientRoot'

const render = Component => {
	ReactDOM.render(
		<AppContainer>
			<Component />
		</AppContainer>,
		document.getElementById('react-root'),
	)
}

render(App)

// Webpack Hot Module Replacement API
if (module.hot) {
	module.hot.accept('components/root/ClientRoot', () => { render(App) })
}
