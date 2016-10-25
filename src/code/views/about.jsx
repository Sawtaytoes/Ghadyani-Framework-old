import React, { PureComponent } from 'react'
import { Link } from 'react-router'

// Components
import Sample from 'components/sample'

// Utilities
import { stylesHelper } from 'utilities/styles-helper'

const styles = []

class Home extends PureComponent {
	render() { return (
		<div>
			<h1>About</h1>
			<Sample />

			<Link to="/" title="Go to Home">Home</Link>
		</div>
	)}
}

module.exports = stylesHelper(Home, styles)
