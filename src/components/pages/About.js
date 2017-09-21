import React from 'react'
import { Link } from 'react-router-dom'
import { pure } from 'recompose'

import Sample from 'components/sample/sample'

export const About = () => (
	<div>
		<h1>About</h1>
		<Link to="/" title="Go to Home">Home</Link>
		<Sample />
	</div>
)

export default pure(About)
