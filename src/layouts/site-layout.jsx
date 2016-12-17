import React, { PureComponent } from 'react'
// import GoogleAnalytics from 'react-g-analytics'

// Utilities
import StylesLoader from 'utilities/styles-loader'

// Styles
const stylesLoader = StylesLoader.create()
.add(require('normalize.css'))
.add(require('layouts/global.styl'))
.add(require('layouts/site-layout.styl'))

class SiteLayout extends PureComponent {
	render() { return (
		<div>
			{this.props.children}
			{/*<GoogleAnalytics id="UA-????????-?" />*/}
		</div>
	)}
}

export default stylesLoader.render(SiteLayout)
