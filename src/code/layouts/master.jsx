import Inferno from 'inferno'
import Component from 'inferno-component'

// Utilities
import StylesLoader from 'utilities/styles-loader'

// Styles
const stylesLoader = StylesLoader.create()
.add(require('normalize.css'))
.add(require('styl/global'))
.add(require('styl/site'))

class Master extends Component {
	render() { return (
		<div>
			{this.props.children}
		</div>
	)}
}

export default stylesLoader.render(Master)
