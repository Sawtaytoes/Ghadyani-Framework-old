import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import {
	tapMessageType,
	tapColor,
} from 'reducers/tap/helpers'

const headerStyles = { margin: '10px 0 6px' }

const Header = ({ text }) => (
	<h2 style={headerStyles}>
		{text}
	</h2>
)

Header.propTypes = {
	text: PropTypes.string.isRequired,
}

const testRunStyles = {
	container: {
		display: 'flex',
		margin: '3px 0',
		padding: '10px',
	},

	testNumber: {
		paddingRight: '2ex',
	},

	text: {
		flex: '1 1 auto',
	},
}

const tapMessageStyles = {
	[tapMessageType.pass]: {
		...testRunStyles.container,
		color: 'greenyellow',
		backgroundColor: tapColor.pass,
	},

	[tapMessageType.fail]: {
		...testRunStyles.container,
		color: 'white',
		backgroundColor: tapColor.fail,
	},
}

const TestRun = ({ testNumber, text, type }) => (
	<p style={tapMessageStyles[type]}>
		<b style={testRunStyles.testNumber}>
			{testNumber}
		</b>

		<span style={testRunStyles.text}>
			{text}
		</span>
	</p>
)

TestRun.propTypes = {
	testNumber: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
}

export const TapLineItem = ({
	testNumber,
	text,
	type,
}) => (
	type === tapMessageType.header
	? <Header text={text} />
	: (
		<TestRun
			testNumber={testNumber}
			text={text}
			type={type}
		/>
	)
)

TapLineItem.propTypes = {
	testNumber: PropTypes.number,
	text: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
};

const mapStateToProps = (_, initialProps) => (
	({ tap: { tests } }) => ({
		...tests[initialProps.id]
	})
)

export default connect(mapStateToProps)(TapLineItem)
