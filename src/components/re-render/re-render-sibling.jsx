import React, { PureComponent } from 'react'

import ReRenderCousin from 'components/re-render/re-render-cousin'
import ReRenderGrandChild from 'components/re-render/re-render-grand-child'
import ReRenderSecondCousin from 'components/re-render/re-render-second-cousin'

// const ReRenderSibling = ({ someFunc }) => (
class ReRenderSibling extends PureComponent {
	render() {
		console.debug('re-render-sibling');
		return (
			<div>
				{/*<button onClick={someFunc}>Click Me!</button>*/}

				<div style={{ padding: '20px' }}>
					<ReRenderGrandChild />
					<ReRenderCousin />
					<ReRenderSecondCousin />
				</div>

				<ol>
					<li>Sibling sibling sibling.</li>
					<li>Sibling sibling sibling lorem libero.</li>
				</ol>
			</div>
		)
	}
}

export default ReRenderSibling
