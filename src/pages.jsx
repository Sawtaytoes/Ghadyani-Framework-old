import React from 'react'
import { Route, Switch } from 'react-router-dom'

import SiteLayout from 'components/site-layout/site-layout'
import Home from 'components/pages/home'
import About from 'components/pages/about'
import NoMatch from 'components/pages/no-match'

const Pages = () => (
	<SiteLayout>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/about" component={About} />
			<Route component={NoMatch} />
		</Switch>
	</SiteLayout>
)

export default Pages
