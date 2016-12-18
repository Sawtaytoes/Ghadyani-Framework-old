import React, { PureComponent, PropTypes } from 'react'

export default class AsyncComponent extends PureComponent {
	static propTypes = {
		componentLoader: PropTypes.func.isRequired,
	}

	constructor() {
		super()
		this.component = this.component || <div />
	}

	componentWillMount() {
		const { componentLoader } = this.props
		componentLoader(this.asyncComponentLoaded.bind(this))
	}

	asyncComponentLoaded(promise) {
		promise
		.then(module => module.default)
		.then(View => this.component = <View />)
		.catch(err => this.component = <div>
			<div>AsyncComponent failed to load component asynchronously.</div>
			<div>{err}</div>
		</div>)

		this.forceUpdate()
	}

	render() { return (
		<div>{this.component}</div>
	)}
}
