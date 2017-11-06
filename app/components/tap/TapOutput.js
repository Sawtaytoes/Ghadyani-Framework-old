import React from 'react'

import renderPure from 'renderers/renderPure'
import TapFailures from './TapFailures'
import TapMessages from './TapMessages'
import TapStats from './TapStats'

export const TapOutput = () => (
	<div>
		<TapStats />
		<TapFailures />
		<TapMessages />
	</div>
)

export default renderPure(TapOutput)
