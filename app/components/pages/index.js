import React from 'react'
import { Route, Switch } from 'react-router-dom'

import SiteLayout from 'components/siteLayout/SiteLayout'
import Home from 'components/pages/Home'
import About from 'components/pages/About'
import NoMatch from 'components/pages/NoMatch'

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
