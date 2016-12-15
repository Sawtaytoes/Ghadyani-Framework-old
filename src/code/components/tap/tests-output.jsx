import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import hash from 'murmurhash-js'

// Components
import TestsStats from 'components/tap/tests-stats'
import TestsFailures from 'components/tap/tests-failures'
import TestsList from 'components/tap/tests-list'

// Enums
import {
	TAP_MESSAGE_TYPE,
	TAP_COLOR,
} from 'ducks/tap'

class TapOutput extends PureComponent {
	renderError(message, styles = {}) {
		return <pre key={hash(message)} style={{
			margin: '0',
			padding: '0 10px',
			lineHeight: '2em',
			...styles,
		}}>{message}</pre>
	}

	renderFailMessages() {
		var { messages } = this.props,
			output = [
				<h1 key="failures-title">Failures</h1>
			]

		messages.forEach((line, index) => {
			if (!line) { return }

			if (line.search(/^(not ok)/) === 0) {
				var i = index

				while(i >= 0) {
					let text = messages[--i]
					if (text && text.search(/^(#)/) === 0) {
						output.push(this.renderHeading(text))
						break
					}
				}

				output.push(this.renderNotOk(line))
			} else if (line.search(/^( {2})/) === 0) {
				if (line.search(/^( {2}---)/) === 0
					|| line.search(/^( {2}\.\.\.)/) === 0
				) { return }

				output.push(this.renderError(line))
			}
		})

		return output
	}

	render() { return (
		<div>
			<TestsStats />
			<TestsFailures />
			<TestsList />
		</div>
	)}
	// {this.props.hasFailure && <div>{this.renderFailMessages()}</div>}
	// <div>{this.renderTapMessages()}</div>
}

export default connect(({ tap }) => ({
	failures: tap.failures,
}))(TapOutput)
