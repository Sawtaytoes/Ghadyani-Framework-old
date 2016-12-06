import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import hash from 'murmurhash-js'

class TapOutput extends PureComponent {
	color = {
		fail: 'crimson',
		info: 'dimgrey',
		pass: 'green',
	}

	constructor() {
		super()
		this.startTime = new Date()
	}

	getMessageInfoFromLine(line, identifier) {
		return line.match(new RegExp(`^${identifier}[ ]*(.+)$`))
	}

	getMessageFromLine(line, identifier) {
		return this.getMessageInfoFromLine(line, identifier)[1]
	}

	renderHeading(line) {
		let message = this.getMessageFromLine(line, '#')
		return <h2 key={hash(message)}>{message}</h2>
	}

	renderOk(line) {
		let messageInfo = this.getMessageInfoFromLine(line, 'ok (\\d+)')
		return this.renderMessageInfo(messageInfo, {
			color: 'greenyellow',
			backgroundColor: this.color.pass,
		})
	}

	renderNotOk(line) {
		let messageInfo = this.getMessageInfoFromLine(line, 'not ok (\\d+)')
		return this.renderMessageInfo(messageInfo, {
			color: 'white',
			backgroundColor: this.color.fail,
		})
	}

	renderMessageInfo(messageInfo, styles = {}) {
		let testNumber = messageInfo[1],
			message = messageInfo[2]

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

	renderTestsInfo() {
		let { total, passed, failed, duration } = this.props
		return [
			<h1 key="stats-title">Stats</h1>,

			<h2 key="stats-values">
				{!(total || passed || failed || duration) && <span>Tests running...</span>}

				{total && <span>
					<small>Total</small> <span style={{color: this.color.info}}>{total}</span>
				</span>}

				{total && passed && <span> | </span>}

				{passed && <span>
					<small>Passing</small> <span style={{color: this.color.pass}}>{passed}</span>
				</span>}

				{(total || passed) && failed && <span> | </span>}

				{failed && <span>
					<small>Failing</small> <span style={{color: this.color.fail}}>{failed}</span>
				</span>}

				{(total || passed || failed) && duration && <span> | </span>}

				{duration && <span>
					<small>Duration</small> <span style={{color: this.color.info}}>{duration.toFixed(1)}s</span>
				</span>}
			</h2>,
		]
	}

	render() { return (
		<div>
			<div>{this.renderTestsInfo()}</div>
			{this.props.hasFailures && <div>{this.renderFailMessages()}</div>}
			<div>{this.renderTapMessages()}</div>
		</div>
	)}
}

export default connect(state => ({
	messages: state.tap.messages,
	hasFailures: state.tap.hasFailures,
	total: state.tap.total,
	duration: state.tap.duration,
	passed: state.tap.passed,
	failed: state.tap.failed,
}))(TapOutput)
