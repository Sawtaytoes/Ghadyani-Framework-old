import React from 'react'

import { stylesLoader } from 'utils/stylesLoader'

export const Sample = () => (
	<div className="sample">
		<h2 className="sample__heading">Sample</h2>
		<p className="sample__description">This is a sample component.</p>
	</div>
)

export default stylesLoader(require('./Sample.styl'))(Sample)
