import React, { Component } from 'react'

// Utilities
import renderStyles from 'utilities/styles'

class StylesLoader {
	static create() {
		return new StylesLoader()
	}

	constructor() {
		this.stylesFiles = []
	}

	add(filename) {
		this.stylesFiles.push(filename)
		return this
	}

	render(component) {
		return renderStyles(component, this.stylesFiles)
	}
}

export default StylesLoader
