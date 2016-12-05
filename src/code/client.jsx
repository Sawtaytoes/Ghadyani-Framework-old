import Inferno, { render } from 'inferno'
import { Router, Route } from 'inferno-router'
import history from 'history'
console.log(history);
// import createBrowserHistory from 'history/createBrowserHistory'

// const browserHistory = createBrowserHistory()
const browserHistory = {}

// Root Component
// import ClientRoot from 'client-root'

// Vars
const RootElement = document.getElementById('root')
// render(<div>hi</div>, RootElement)
render(
	<Router history={browserHistory}>
		<Route path="*" component={<div>hi</div>} />
	</Router>
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
