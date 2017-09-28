import Adapter from 'enzyme-adapter-react-16'
import { configure } from 'enzyme'

// Setup Enzyme for React 16
configure({ adapter: new Adapter() })

// Check if file is a test specificially meant to run with failures for testing TAP parsing
export const isTapTestFile = fileName => (
	fileName.includes('TapOutput.test.js')
)

// Setup `*.test.js` files to watch
const getTestFiles = () => (
	require
	.context(
		'../',
		true,
		/^\.\/.*\.test\.js$/
	)
)

export default getTestFiles
