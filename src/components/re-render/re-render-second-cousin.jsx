import React, { Component } from 'react'

// const ReRenderSecondCousin = ({ someFunc }) => (
class ReRenderSecondCousin extends Component {
	shouldComponentUpdate() {
		return false
	}

	render() {
		console.debug('re-render-second-cousin');
		return (
			<div>
				{/*<button onClick={someFunc}>Click Me!</button>*/}

				<ul>
					<li>Second second second.</li>
					<li>Second second second lorem libero.</li>
				</ul>
			</div>
		)
	}
}

export default ReRenderSecondCousin
