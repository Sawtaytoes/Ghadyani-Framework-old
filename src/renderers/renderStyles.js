import hash from 'murmurhash-js'
import React, { PureComponent } from 'react'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'

const styles = new Map()

export const getStyles = () => (
	Array.from(styles.values())
	.join('')
)

export const setStyles = css => (
	styles.set(hash(css), css)
)

const addStyles = stylesFiles => (
	stylesFiles
	.map(stylesFile => (
		canUseDOM
		? stylesFile._insertCss()
		: setStyles(stylesFile._getCss())
	))
)

const removeStyles = (styleRemovers = []) => () => (
	styleRemovers
	.map(styleRemover => styleRemover())
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
