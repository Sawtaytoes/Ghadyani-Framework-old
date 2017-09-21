import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import TapLineItem from 'components/tap/TapLineItem'

const styles = { marginTop: '1em' }

export const TapMessages = ({ tests }) => (
	<div style={styles}>
		{
			tests
			.map((_, index) => (
				<TapLineItem key={index} id={index} />
			))
		}
	</div>
)

TapMessages.propTypes = {
	tests: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const mapStateToProps = ({ tap: { tests } }) => ({
	tests,
})

export default connect(mapStateToProps)(TapMessages)
