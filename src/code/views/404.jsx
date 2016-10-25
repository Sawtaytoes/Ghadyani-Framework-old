import React, { PureComponent } from 'react'
import { Link } from 'react-router'

// Utilities
import { stylesLoader } from 'utilities/styles-loader'

// Styles
const styles = []

class NoMatch extends PureComponent {
	render() { return (
		<div>
			<h1>404</h1>
			<Link to="/" title="Go to landing page">Go Back</Link>
		</div>
	)}
}

module.exports = stylesLoader(NoMatch, styles)
