// Utilities
import renderStyles from 'utils/styles'

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
export const stylesLoader = file => {
	const stylesLoader = StylesLoader.create().add(file)
	return stylesLoader.render.bind(stylesLoader)
}
