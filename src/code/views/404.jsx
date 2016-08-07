import React, { PureComponent } from 'react'

// Utilities
import { stylesHelper } from 'utilities/styles-helper'

// Styles
const styles = [
]

class NoMatch extends PureComponent {
	render() { return (
		<div>
			404
		</div>
	)}
}

module.exports = stylesHelper(NoMatch, styles)
