import React from 'react'
import { pure } from 'recompose'

import ReRenderCousin from 'components/re-render/re-render-cousin'
import ReRenderGrandChild from 'components/re-render/re-render-grand-child'
import ReRenderSecondCousin from 'components/re-render/re-render-second-cousin'

const ReRenderChild = ({ onClick }) => {
// const ReRenderChild = () => {
	console.debug('re-render-child');
	return (
		<div>
			{onClick &&
				<button onClick={onClick}>Click Me!</button>
			}

			<div style={{ padding: '20px' }}>
				<ReRenderGrandChild />
				<ReRenderCousin />
				<ReRenderSecondCousin />
			</div>

			<ol>
				<li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
				<li>Aliquam tincidunt mauris eu risus.</li>
			</ol>
		</div>
	)
}

export default pure(ReRenderChild)
