import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import TestItem from 'components/tap/TestItem'

const styles = { marginTop: '1em' }

export const TestsList = ({ tests }) => (
	<div style={styles}>
		{
			tests
			.map((_, index) => (
				<TestItem key={index} id={index} />
			))
		}
	</div>
)


TestsList.propTypes = {
	tests: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const mapStateToProps = ({ tap }) => ({
	tests: tap.tests,
})

export default connect(mapStateToProps)(TestsList)
