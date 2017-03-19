import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

// Components
import Sample from 'components/sample'

// Utilities
import StylesLoader from 'utilities/styles-loader'

// Styles
const stylesLoader = StylesLoader.create()

class About extends PureComponent {
	render() { return (
		<div>
			<h1>About</h1>
			<Link to="/" title="Go to Home">Home</Link>
			<Sample />
		</div>
	)}
}

export default stylesLoader.render(About)
