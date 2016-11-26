// PURPOSE: Allows the use of `require.ensure` through Webpack v1 to asynchronously load components

import React, { PureComponent, PropTypes } from 'react'

const isAsyncCapable = typeof window !== 'undefined'
export default class AsyncComponent extends PureComponent {
	static propTypes = {
		fileLocation: PropTypes.string.isRequired
	}

	constructor() {
		super()
		this.views = {}
	}

	loadView() {
		return isAsyncCapable ? this.asyncLoader() : this.syncLoader()
	}

	syncLoader() {
		const { fileLocation } = this.props
		const View = require(fileLocation)
		return <View />
	}

	asyncLoader() {
		const { fileLocation } = this.props
		const storedView = this.views[fileLocation]
		if (storedView) {
			delete this.views[fileLocation]
			return storedView
		}

		new Promise(resolve => require.ensure([], require => {
			// console.log(fileLocation);
			// console.log(require);
			// console.log(require.resolve);
			// console.log(require.resolve(fileLocation));
			// resolve(fileLocation().default)
			resolve(require('../' + fileLocation).default)
			// resolve()
			// resolve(require().default)
		}))
		.then(View => this.views[fileLocation] = <View />)
		.then(() => this.forceUpdate())
		.catch(err => {
			console.error(err)
			throw new Error(err)
		})

		return <div />
	}

	render() {
		return this.loadView()
	}
}
