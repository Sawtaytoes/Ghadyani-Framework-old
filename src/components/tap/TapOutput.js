import React from 'react'
import { pure } from 'recompose'

import TapStats from './TapStats'
import TapFailures from './TapFailures'
import TapMessages from './TapMessages'

export const TapOutput = () => (
	<div>
		<TapStats />
		<TapFailures />
		<TapMessages />
	</div>
)

export default pure(TapOutput)
