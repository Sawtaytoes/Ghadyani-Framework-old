import React from 'react'
import { pure } from 'recompose'

import renderStyles from 'renderers/renderStyles'

export const Sample = () => (
	<div className="sample">
		<h2 className="sample__heading">Sample</h2>
		<p className="sample__description">This is a sample component.</p>
	</div>
)

export default (
	renderStyles(
		require('./Sample.styl')
	)(
		pure(Sample)
	)
)
