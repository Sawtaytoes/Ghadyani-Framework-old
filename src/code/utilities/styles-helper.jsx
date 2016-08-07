import React, { Component } from 'react'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'
import murmurhash3_32_gc from 'murmurhash-js'

var styles = [],
	cssDictionary = {}

export function stylesHelper(ComposedComponent, stylesFiles) {
	return class Styles extends Component {
		componentWillMount() {
			this.styleRemovers = this.setStyles(stylesFiles)
		}

		componentWillUnmount() {
			this.removeStyles()
		}

		setStyles(stylesFiles) {
			let renderedCollection = []

			stylesFiles && stylesFiles.forEach((stylesFile) => {
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
			let cssHash = murmurhash3_32_gc(css)

			if (!cssDictionary[cssHash]) {
				cssDictionary[cssHash] = true
				styles.push(css)
			}
		}

		removeStyles() {
			setTimeout(() => {
				this.styleRemovers && this.styleRemovers.forEach(styleRemover => typeof styleRemover === 'function' && styleRemover())
			}, 0)
		}

		render() {
			return <ComposedComponent {...this.props} />
		}
	}
}

export function renderStyles() {
	return styles.join('')
}
