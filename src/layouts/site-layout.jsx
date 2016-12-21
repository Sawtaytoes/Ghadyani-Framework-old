import React, { PureComponent, PropTypes } from 'react'
// import GoogleAnalytics from 'react-g-analytics'

// Utilities
import StylesLoader from 'utilities/styles-loader'

// Styles
const stylesLoader = StylesLoader.create()
.add(require('normalize.css'))
.add(require('layouts/global.styl'))
.add(require('layouts/site-layout.styl'))

const prod = process.env.NODE_ENV === 'production'

class SiteLayout extends PureComponent {
	static propTypes = {
		children: PropTypes.node.isRequired
	};

	render() { return (
		<div className="site-layout">
			<main className={`site-layout__container site-layout__content ${!prod ? 'site-layout__content--development' : ''}`}>
				{this.props.children}
			</main>
			{!prod && <aside className="site-layout__container site-layout__tests">
				<iframe className="site-layout__tests__frame" src="/tests" />
			</aside>}
			{/*<GoogleAnalytics id="UA-????????-?" />*/}
		</div>
	)}
}

export default stylesLoader.render(SiteLayout)
