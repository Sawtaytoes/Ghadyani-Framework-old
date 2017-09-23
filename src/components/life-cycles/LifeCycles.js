import PropTypes from 'prop-types'
import { PureComponent } from 'react'

export default class LifeCycles extends PureComponent {
	static propTypes = {
		children: PropTypes.element.isRequired,
		componentDidMount: PropTypes.func,
		componentDidUpdate: PropTypes.func,
		componentWillMount: PropTypes.func,
		componentWillReceiveProps: PropTypes.func,
		componentWillUnmount: PropTypes.func,
		componentWillUpdate: PropTypes.func,
		shouldComponentUpdate: PropTypes.func,
	}

	componentDidMount = this.props.componentDidMount
	componentDidUpdate = this.props.componentDidUpdate
	componentWillMount = this.props.componentWillMount
	componentWillReceiveProps = this.props.componentWillReceiveProps
	componentWillUnmount = this.props.componentWillUnmount
	componentWillUpdate = this.props.componentWillUpdate
	shouldComponentUpdate = this.props.shouldComponentUpdate

	render() {
		return this.props.children
	}
}
