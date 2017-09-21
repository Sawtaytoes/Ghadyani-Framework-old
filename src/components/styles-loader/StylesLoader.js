import renderStyles from 'renderers/renderStyles'

export default class StylesLoader {
	static create() {
		return new StylesLoader()
	}

	constructor() {
		this.styleFiles = []
	}

	add(file) {
		this.styleFiles.push(file)
		return this
	}

	render(component) {
		return renderStyles(component, this.styleFiles)
	}
}

export const stylesLoader = file => {
	const stylesLoader = StylesLoader.create().add(file)
	return stylesLoader.render.bind(stylesLoader)
}
