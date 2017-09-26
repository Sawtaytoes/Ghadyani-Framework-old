import React, { PureComponent } from 'react'

const renderPure = ComposedComponent => (
	class Pure extends PureComponent {
		shouldComponentUpdate(props, nextProps) {
			return props !== nextProps
		}

		render() {
			return <ComposedComponent {...this.props} />
		}
	}
)

export default renderPure
