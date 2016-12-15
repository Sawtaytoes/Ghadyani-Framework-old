import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

// Components
import Test from 'components/tap/test'

class TestsList extends PureComponent {
	render() {
		const { tests } = this.props

		return (
			<div>
				{tests.map((_, index) => <Test key={index} id={index} />)}
			</div>
		)
	}
}

export default connect(({ tap }) => ({
	tests: tap.tests,
}))(TestsList)
