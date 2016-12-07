// Utilities
import renderStyles from 'utilities/styles'

class StylesLoader {
	static create() {
		return new StylesLoader()
	}

	constructor() {
		this.stylesFiles = []
	}

	add(file) {
		this.stylesFiles.push(file)
		return this
	}

	render(component) {
		return renderStyles(component, this.stylesFiles)
	}
}

export default StylesLoader
