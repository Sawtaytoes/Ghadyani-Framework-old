import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

// Enums
import {
	TAP_MESSAGE_TYPE,
	TAP_COLOR,
} from 'ducks/tap'

const Header = ({ text }) => (
	<h2>{text}</h2>
)

Header.propTypes = {
	text: PropTypes.string.isRequired,
}

const Line = ({ styles, testNumber, text }) => (
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

Line.propTypes = {
	styles: PropTypes.object.isRequired,
	testNumber: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
}

export const Test = ({
	testNumber,
	text,
	type,
}) => (
	<div>
		{type === TAP_MESSAGE_TYPE.HEADER ? <Header text={text} />
			: type === TAP_MESSAGE_TYPE.PASS ? <Line
				testNumber={testNumber}
				text={text}
				styles={{
					color: 'greenyellow',
					backgroundColor: TAP_COLOR.PASS
				}}
			/>
			: <Line
				testNumber={testNumber}
				text={text}
				styles={{
					color: 'white',
					backgroundColor: TAP_COLOR.FAIL
				}}
			/>
		}
	</div>
)

Test.propTypes = {
		testNumber: PropTypes.number,
		text: PropTypes.string.isRequired,
		type: PropTypes.object.isRequired,
	};


export default connect((_, initialProps) => ({ tap }) => ({
	...(tap.tests[initialProps.id] || {})
}))(Test)
