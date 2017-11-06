// import GoogleAnalytics from 'react-g-analytics'
import PropTypes from 'prop-types'
import React from 'react'

import renderPure from 'renderers/renderPure'
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
		renderPure(SiteLayout)
	)
)
