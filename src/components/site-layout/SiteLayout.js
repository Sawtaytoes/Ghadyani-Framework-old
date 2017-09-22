// import GoogleAnalytics from 'react-g-analytics'
import PropTypes from 'prop-types'
import React from 'react'
import { pure } from 'recompose'

import renderStyles from 'renderers/renderStyles'

export const SiteLayout = ({ children }) => (
	<div>
		{children}
		{/*<GoogleAnalytics id="UA-????????-?" />*/}
	</div>
)

SiteLayout.propTypes = {
	children: PropTypes.node.isRequired
}

export default (
	renderStyles([
		require('normalize.css'),
		require('./SiteLayout.styl'),
	])(
		pure(SiteLayout)
	)
)
