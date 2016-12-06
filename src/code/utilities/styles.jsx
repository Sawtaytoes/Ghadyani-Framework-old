import React, { PureComponent } from 'react'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'
import hash from 'murmurhash-js'

const styles = []
const cssDictionary = {}

export const getStyles = () => styles.join('')

export default function renderStyles(ComposedComponent, stylesFiles) {
	return class Styles extends PureComponent {
		componentWillMount() {
			this.styleRemovers = this.setStyles()
		}

		componentWillUnmount() {
			this.removeStyles()
		}

		setStyles() {
			let renderedCollection = []

			stylesFiles && stylesFiles.forEach(stylesFile => {
				let css = stylesFile._getCss()

				if (canUseDOM) {
					renderedCollection.push(this.setDomStyles(css, stylesFile))
				} else {
					this.setPreRenderedStyles(css)
				}
			})

			return renderedCollection
		}

		setDomStyles(css, stylesFile) {
			styles.push(css)
			return stylesFile._insertCss()
		}

		setPreRenderedStyles(css) {
			let cssHash = hash(css)

			if (!cssDictionary[cssHash]) {
				cssDictionary[cssHash] = true
				styles.push(css)
			}
		}

		removeStyles() {
			setTimeout(() => {
				this.styleRemovers && this.styleRemovers.forEach(styleRemover => {
					typeof styleRemover === 'function' && styleRemover()
				})
			}, 0)
		}

		render() {
			return <ComposedComponent {...this.props} />
		}
	}
}
