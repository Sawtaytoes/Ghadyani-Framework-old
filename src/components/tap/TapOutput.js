import React from 'react'
import { pure } from 'recompose'

import TapStats from 'components/tap/TapStats'
import TapFailures from 'components/tap/TapFailures'
import TapMessages from 'components/tap/TapMessages'

export const TapOutput = () => (
	<div>
		<TapStats />
		<TapFailures />
		<TapMessages />
	</div>
)

export default pure(TapOutput)
