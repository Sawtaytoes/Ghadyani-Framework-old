import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

// Enums
import {
	TAP_MESSAGE_TYPE,
	TAP_COLOR,
} from 'ducks/tap'

class TestsList extends PureComponent {
	render() {
		const { tests } = this.props

		return (
			<div>
				{tests.map(({ type, text }, index) => (
					type === TAP_MESSAGE_TYPE.HEADER ? <h2 key={index}>{text}</h2>
					: type === TAP_MESSAGE_TYPE.PASS ? <p key={index}
						style={{
							color: 'greenyellow',
							backgroundColor: TAP_COLOR.PASS
						}}
					>{text}</p>
					: <p key={index}
						style={{
							color: 'white',
							backgroundColor: TAP_COLOR.FAIL
						}}
					>{text}</p>
				))}
			</div>
		)
	}
}

export default connect(({ tap }) => ({
	tests: tap.tests,
}))(TestsList)
