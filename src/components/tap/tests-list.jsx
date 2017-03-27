import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Test from 'components/tap/test'

export const TestsList = ({ tests }) => {
	return (
		<div style={{ marginTop: '1em' }}>
			{tests.map((_, index) => <Test key={index} id={index} />)}
		</div>
	)
}

TestsList.propTypes = {
	tests: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default connect(({ tap }) => ({
	tests: tap.tests,
}))(TestsList)
