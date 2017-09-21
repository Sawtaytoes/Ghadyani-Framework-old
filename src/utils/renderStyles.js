import hash from 'murmurhash-js'
import React, { PureComponent } from 'react'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'

const cssDictionary = new Set()
const styles = []

export const getStyles = () => styles.join('')

export const setPreRenderedStyles = css => {
	const cssHash = hash(css)

	if (!cssDictionary.has(cssHash)) {
		cssDictionary.add(cssHash)
		styles.push(css)
	}
}

const addStyles = stylesFiles => (
	stylesFiles
	.map(stylesFile => (
		canUseDOM
		? stylesFile._insertCss()
		: setPreRenderedStyles(stylesFile._getCss())
	))
)

const removeStyles = (styleRemovers = []) => () => (
	styleRemovers
	.forEach(styleRemover => (
		typeof styleRemover === 'function'
		&& styleRemover()
	))
)

const renderStyles = (ComposedComponent, stylesFiles = []) => (
	class Styles extends PureComponent {
		componentWillMount() {
			this.styleRemovers = addStyles(stylesFiles)
		}

		componentWillUnmount() {
			new Promise(setTimeout)
			.then(removeStyles(this.styleRemovers))
		}

		render() {
			return <ComposedComponent {...this.props} />
		}
	}
)

export default renderStyles
