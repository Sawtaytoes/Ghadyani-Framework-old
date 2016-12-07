import Inferno, { render } from 'inferno'
import { Router, Route } from 'inferno-router'
import createBrowserHistory from 'history/createBrowserHistory'

const browserHistory = createBrowserHistory()

// Root Component
// import ClientRoot from 'client-root'

// Vars
const RootElement = document.getElementById('root')
// render(<div>hi</div>, RootElement)
const Test = () => <div>hi</div>
render(
	<div>
		<Router history={browserHistory}>
			<Route path="*" component={Test} />
		</Router>
	</div>
, RootElement)

// render(
// 	<ClientRoot />
// , RootElement)

// if (module.hot) {
// 	module.hot.accept('./client-root', () => {
// 		const ClientRootHotReload = require('./client-root').default

// 		render(
// 			<ClientRootHotReload />
// 		, RootElement)
// 	})
// }
