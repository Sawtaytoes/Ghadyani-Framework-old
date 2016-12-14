import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import hash from 'murmurhash-js'

// Components
import TestsStats from 'components/tests-stats'
import TestsList from 'components/tests-list'

// Enums
import {
	TAP_MESSAGE_TYPE,
	TAP_COLOR,
} from 'ducks/tap'

class TapOutput extends PureComponent {
	getMessageFromLine(line, identifier) {
		return line.match(new RegExp(`^${identifier}[ ]*(.+)$`))
	}

	renderHeading(line) {
		const message = this.getMessageFromLine(line, '#')[1]
		return <h2 key={hash(message)}>{message}</h2>
	}

	renderOk(line) {
		const messageInfo = this.getMessageFromLine(line, 'ok (\\d+)')
		return this.renderMessage(messageInfo, {
			color: 'greenyellow',
			backgroundColor: this.color.pass,
		})
	}

	renderNotOk(line) {
		const messageInfo = this.getMessageFromLine(line, 'not ok (\\d+)')
		return this.renderMessage(messageInfo, {
			color: 'white',
			backgroundColor: this.color.fail,
		})
	}

	renderMessage(messageInfo, styles = {}) {
		const [testNumber, message] = messageInfo

		return (
			<p key={hash(testNumber + message)} style={{
				display: 'flex',
				padding: '10px',
				...styles,
			}}>
				<b style={{
					paddingRight: '2ex',
				}}>{testNumber}</b>
				<span style={{
					flex: '1 1 auto',
				}}>{message}</span>
			</p>
		)
	}

	renderError(message, styles = {}) {
		return <pre key={hash(message)} style={{
			margin: '0',
			padding: '0 10px',
			lineHeight: '2em',
			...styles,
		}}>{message}</pre>
	}

	renderTapMessages() {
		var { messages } = this.props,
			output = []

		messages.forEach(line => {
			if (!line) { return }

			if (line.search(/^(#)/) === 0) {
				if (
					line.search(/^(# ok)/) === 0
					|| line.search(/^(# tests)/) === 0
					|| line.search(/^(# pass)/) === 0
					|| line.search(/^(# fail)/) === 0
				) {
					return
				}

				output.push(this.renderHeading(line))
			} else if (line.search(/(^ok)/) === 0) {
				output.push(this.renderOk(line))
			} else if (line.search(/^(not ok)/) === 0) {
				output.push(this.renderNotOk(line))
			}
		})

		return output
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
			<TestsList />
		</div>
	)}
	// {this.props.hasFailure && <div>{this.renderFailMessages()}</div>}
	// <div>{this.renderTapMessages()}</div>
}

export default connect(({ tap }) => ({
	duration: tap.duration,
	numFailed: tap.numFailed,
	numPassed: tap.numPassed,
	numTotal: tap.numTotal,
	tests: tap.tests,
	failures: tap.failures,
	testsComplete: tap.testsComplete,
}))(TapOutput)
