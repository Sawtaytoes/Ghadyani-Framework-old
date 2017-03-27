import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {
	TAP_MESSAGE_TYPE,
	TAP_COLOR,
} from 'ducks/tap'

const Header = ({ text }) => (
	<h2 style={{ margin: '10px 0 6px' }}>
		{text}
	</h2>
)

Header.propTypes = {
	text: PropTypes.string.isRequired,
}

const Line = ({ styles, testNumber, text }) => (
	<p style={{
		display: 'flex',
		margin: '2px 0',
		padding: '10px',
		...styles,
	}}>
		<b style={{
			paddingRight: '2ex',
		}}>
			{testNumber}
		</b>
		<span style={{
			flex: '1 1 auto',
		}}>
			{text}
		</span>
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
}) => {
	if (type === TAP_MESSAGE_TYPE.HEADER) {
		return <Header text={text} />

	} else if (type === TAP_MESSAGE_TYPE.PASS) {
		return <Line
			testNumber={testNumber}
			text={text}
			styles={{
				color: 'greenyellow',
				backgroundColor: TAP_COLOR.PASS
			}}
		/>

	} else {
		return <Line
			testNumber={testNumber}
			text={text}
			styles={{
				color: 'white',
				backgroundColor: TAP_COLOR.FAIL
			}}
		/>
	}
}

Test.propTypes = {
		testNumber: PropTypes.number,
		text: PropTypes.string.isRequired,
		type: PropTypes.object.isRequired,
	};


export default connect((_, initialProps) => ({ tap }) => ({
	...(tap.tests[initialProps.id] || {})
}))(Test)
