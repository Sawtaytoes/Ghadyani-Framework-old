import React, { PureComponent } from 'react'

// Utilities
import { stylesLoader } from 'utilities/styles-loader'

class Sample extends PureComponent {
	render() { return (
		<div className="sample">
			<h2 className="sample__heading">Sample</h2>
			<p className="sample__description">This is a sample component.</p>
		</div>
	)}
}

export default stylesLoader(require('./sample.styl'))(Sample)
