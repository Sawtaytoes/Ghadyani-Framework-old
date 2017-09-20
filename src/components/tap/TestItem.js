import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import {
	tapMessageType,
	tapColor,
} from 'ducks/tap'

const Header = ({ text }) => (
	<h2 style={{ margin: '10px 0 6px' }}>
		{text}
	</h2>
)

Header.propTypes = {
	text: PropTypes.string.isRequired,
}

const styles = {
	container: {
		display: 'flex',
		margin: '2px 0',
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
		...styles.container,
		color: 'greenyellow',
		backgroundColor: tapColor.pass,
	},

	[tapMessageType.fail]: {
		...styles.container,
		color: 'white',
		backgroundColor: tapColor.fail,
	},
}

const TestRun = ({ testNumber, text, type }) => (
	<p style={tapMessageStyles[type]}>
		<b style={styles.testNumber}>
			{testNumber}
		</b>

		<span style={styles.text}>
			{text}
		</span>
	</p>
)

TestRun.propTypes = {
	testNumber: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
}

export const TestItem = ({
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

TestItem.propTypes = {
	testNumber: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
};

const mapStateToProps = (_, initialProps) => ({ tap }) => ({
	...(tap.tests[initialProps.id] || {})
})

export default connect(mapStateToProps)(TestItem)
