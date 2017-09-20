import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import TapItem from 'components/tap/TapItem'

const styles = { marginTop: '1em' }

export const TapMessages = ({ tests }) => (
	<div style={styles}>
		{
			tests
			.map((_, index) => (
				<TapItem key={index} id={index} />
			))
		}
	</div>
)


TapMessages.propTypes = {
	tests: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const mapStateToProps = ({ tap }) => ({
	tests: tap.tests,
})

export default connect(mapStateToProps)(TapMessages)
