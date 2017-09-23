import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import TapLineItem from './TapLineItem'

const styles = { marginTop: '1em' }

export const TapMessages = ({ messages }) => (
	<div style={styles}>
		{
			messages
			.map((_, index) => (
				<TapLineItem key={index} id={index} />
			))
		}
	</div>
)

TapMessages.propTypes = {
	messages: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const mapStateToProps = ({ tap: { messages } }) => ({
	messages,
})

export default connect(mapStateToProps)(TapMessages)
