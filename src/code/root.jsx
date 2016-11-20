import React, { Component } from 'react'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Match, Miss } from 'react-router'

// Store and Routes
import { store } from 'utilities/store'

// Views
// import Home from 'views/home'

// console.log(require('./views/home'));

const Home = () => {
	const home = require('./views/home')
	return (<div>hi <home /></div>)
}
// const Home = Promise.resolve(require('./views/home'))
// const Home = () => require.ensure([], (require) => require('./views/home'))

export default class Root extends Component {
	render() { return (
		<AppContainer>
			<Provider store={store}>
				<Router>
					<div>
						<Match exactly pattern="/" render={Home} />
						{/*<Miss component="">*/}
					</div>
				</Router>
			</Provider>
		</AppContainer>
	)}
}
