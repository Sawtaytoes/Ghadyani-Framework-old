import React, { PureComponent } from 'react'

const renderPure = ComposedComponent => (
	class Pure extends PureComponent {
		render() {
			return <ComposedComponent {...this.props} />
		}
	}
)

export default renderPure
