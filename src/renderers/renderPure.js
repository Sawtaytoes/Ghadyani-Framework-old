import React, { PureComponent } from 'react'

const renderPure = ComposedComponent => (
	class Pure extends PureComponent {
		shouldComponentUpdate(props, nextProps) {
			return (
				Object.keys(props)
				.every(key => props[key] === nextProps[key])
				&& (
					Object.keys(nextProps)
					.every(key => nextProps[key] === props[key])
				)
			)
		}

		render() {
			return <ComposedComponent {...this.props} />
		}
	}
)

export default renderPure
