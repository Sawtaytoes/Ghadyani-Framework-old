import React, { PureComponent } from 'react'

// const ReRenderCousin = ({ someFunc }) => (
class ReRenderCousin extends PureComponent {
	render() {
		console.debug('re-render-second-cousin');
		return (
			<div>
				{/*<button onClick={someFunc}>Click Me!</button>*/}

				<ul>
					<li>Kevin kevin kevin.</li>
					<li>Kevin kevin kevin lorem libero.</li>
				</ul>
			</div>
		)
	}
}

export default ReRenderCousin
