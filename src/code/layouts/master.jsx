import React, { PureComponent } from 'react'
import GoogleAnalytics from 'react-g-analytics'
import { connect } from 'react-redux'

// Utilities
import { stylesHelper } from 'utilities/styles-helper'

const styles = []

class Master extends PureComponent {
	render() { return (
		<div>
			{this.props.children}
			<GoogleAnalytics id="UA-????????-?" />
		</div>
	)}
}

export default stylesHelper(Master, styles)
