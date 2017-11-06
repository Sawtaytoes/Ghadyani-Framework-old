import React from 'react'
import { Provider } from 'react-redux'

import store from 'reducers/testsStore'
import TapOutput from 'components/tap/TapOutput'

const TestsRoot = () => (
	<Provider store={store}>
		<TapOutput />
	</Provider>
)

export default TestsRoot
