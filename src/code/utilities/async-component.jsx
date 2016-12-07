import React, { PureComponent, PropTypes } from 'react'

export default class AsyncComponent extends PureComponent {
	static propTypes = {
		name: PropTypes.string,
		componentLoader: PropTypes.func.isRequired,
	}

	constructor() {
		super()
		this.component = this.component || <div />
	}

	componentWillMount() {
		const { componentLoader } = this.props
		console.debug('[render]', this.props.name);
		componentLoader(this.asyncComponentLoaded.bind(this), this.props.name)
	}

	componentWillUnmount() {
		console.debug('[unmounted]', this.props.name)
	}

	asyncComponentLoaded(View) {
		// console.debug('render');
		this.component = <View.default />
		this.forceUpdate()
	}

	render() { return (
		<div>{this.component}</div>
	)}
}
