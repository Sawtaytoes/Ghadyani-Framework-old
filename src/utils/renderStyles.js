import hash from 'murmurhash-js'
import React, { PureComponent } from 'react'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'

const styles = []
const cssDictionary = {}

const setDomStyles = (css, stylesFile) => {
	styles.push(css)
	return stylesFile._insertCss()
}

const setPreRenderedStyles = css => {
	const cssHash = hash(css)

	if (!cssDictionary[cssHash]) {
		cssDictionary[cssHash] = true
		styles.push(css)
	}
}

const addStyles = stylesFiles => (
	stylesFiles
	.map(stylesFile => ({
		css: stylesFile._getCss(),
		stylesFile,
	}))
	.map(({ css, stylesFile }) => (
		canUseDOM
		? setDomStyles(css, stylesFile)
		: setPreRenderedStyles(css)
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
