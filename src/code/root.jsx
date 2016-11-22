import React, { PureComponent } from 'react'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Match, Miss } from 'react-router'

// Store and Routes
import { store } from 'utilities/store'

export default class Root extends PureComponent {
	constructor() {
		super()

		this.views = {}
		this.viewReady = new Set()

		this.loadView = fileName => {
			if (this.viewReady.has(fileName)) {
				this.viewReady.delete(fileName)
				return this.views[fileName]
			}

			new Promise(resolve => require.ensure([], () => {
				resolve(require(`./views/${fileName}`))
			}))
			.then(View => this.views[fileName] = <View />)
			.then(() => this.viewReady.add(fileName))
			.then(() => this.forceUpdate())

			return <div />
		}
	}

	render() { return (
		<AppContainer>
			<Provider store={store}>
				<Router>
					<div>
						<Match exactly pattern="/" component={this.loadView.bind(this, 'home')} />
						<Match exactly pattern="/about" component={this.loadView.bind(this, 'about')} />
						<Miss component={this.loadView.bind(this, '404')} />
					</div>
				</Router>
			</Provider>
		</AppContainer>
	)}
}
