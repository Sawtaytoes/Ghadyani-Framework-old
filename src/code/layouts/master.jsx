import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

// Utilities
import { stylesHelper } from 'utilities/styles-helper'

const styles = [
]

class Master extends PureComponent {
	render() { return (
		<div>
			Hello World
			{this.props.children}
		</div>
	)}
}

export default connect(
)(stylesHelper(Master, styles))
