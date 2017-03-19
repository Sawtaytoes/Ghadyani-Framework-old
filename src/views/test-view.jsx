import { createAsyncComponent } from 'react-async-component'

const TestView = createAsyncComponent({
	resolve: () => System.import('./home')
})

export default TestView
