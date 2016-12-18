import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'

// Enums
import {
	TAP_MESSAGE_TYPE,
	TAP_COLOR,
} from 'ducks/tap'

class Test extends PureComponent {
	static propTypes = {
		id: PropTypes.number.isRequired,
		testNumber: PropTypes.number.isRequired,
		text: PropTypes.string.isRequired,
		type: PropTypes.object.isRequired,
	};

	renderHeader() {
		const { text } = this.props

		return (
			<h2>{text}</h2>
		)
	}

	renderTest(styles) {
		const { testNumber, text } = this.props

		return (
			<p style={{
				display: 'flex',
				padding: '10px',
				...styles,
			}}>
				<b style={{
					paddingRight: '2ex',
				}}>{testNumber}</b>
				<span style={{
					flex: '1 1 auto',
				}}>{text}</span>
			</p>
		)
	}

	render() {
		const { type } = this.props

		return (
			<div>
				{type === TAP_MESSAGE_TYPE.HEADER ? this.renderHeader()
					: type === TAP_MESSAGE_TYPE.PASS ? this.renderTest({
						color: 'greenyellow',
						backgroundColor: TAP_COLOR.PASS
					})
					: this.renderTest({
						color: 'white',
						backgroundColor: TAP_COLOR.FAIL
					})
				}
			</div>
		)
	}
}

export default connect((_, initialProps) => ({ tap }) => ({
	...(tap.tests[initialProps.id] || {})
}))(Test)
