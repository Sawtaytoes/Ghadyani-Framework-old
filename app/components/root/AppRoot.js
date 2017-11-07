import React from 'react'
import { Route, Switch } from 'react-router-dom'

import About from 'components/pages/About'
import Home from 'components/pages/Home'
import NoMatch from 'components/pages/NoMatch'
import SiteLayout from 'components/siteLayout/SiteLayout'

const AppRoot = () => (
	<SiteLayout>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/about" component={About} />
			<Route component={NoMatch} />
		</Switch>
	</SiteLayout>
)

export default AppRoot
