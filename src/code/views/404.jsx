import React, { PureComponent } from 'react'
import { Link } from 'react-router'

// Utilities
import StylesLoader from 'utilities/styles-loader'

// Styles
const stylesLoader = StylesLoader.create()

class NoMatch extends PureComponent {
	render() { return (
		<div>
			<h1>404</h1>
			<Link to="/" title="Go to landing page">Go Back</Link>
		</div>
	)}
}

export default stylesLoader.render(NoMatch)
