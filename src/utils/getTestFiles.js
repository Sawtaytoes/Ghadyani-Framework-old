import Adapter from 'enzyme-adapter-react-16'
import { configure } from 'enzyme'

import 'utils/polyfills'

// Setup Enzyme for React 16
configure({ adapter: new Adapter() })

// Check if file is a test specificially meant to run with failures for testing TAP parsing
export const isValidTestFile = fileName => (
	!fileName.includes('TapOutput.test.js')
)

// Watch `*.test.js` files
export default () => (
	require.context(
		'../',
		true,
		/^\.\/.*\.test\.js$/
	)
)
