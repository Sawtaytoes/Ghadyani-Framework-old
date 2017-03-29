import React from 'react'
import { pure } from 'recompose'

// const ReRenderGrandChild = ({ someFunc }) => (
const ReRenderGrandChild = () => {
	console.debug('re-render-grand-child');
	return (
		<div>
			{/*<button onClick={someFunc}>Click Me!</button>*/}

			<ul>
				<li>Lorems lorem lorem.</li>
				<li>Lorems lorem lorem lorem libero.</li>
			</ul>
		</div>
	)
}

export default pure(ReRenderGrandChild)
