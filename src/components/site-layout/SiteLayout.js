import PropTypes from 'prop-types'
import React from 'react'
// import GoogleAnalytics from 'react-g-analytics'

import StylesLoader from 'utils/stylesLoader'

// Styles
const stylesLoader = StylesLoader.create()
.add(require('normalize.css'))
.add(require('./SiteLayout.styl'))

export const SiteLayout = ({ children }) => (
	<div>
		{children}
		{/*<GoogleAnalytics id="UA-????????-?" />*/}
	</div>
)

SiteLayout.propTypes = {
	children: PropTypes.node.isRequired
}

export default stylesLoader.render(SiteLayout)
