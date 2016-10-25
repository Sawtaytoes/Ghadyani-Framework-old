import test from 'tape-catch'
import TestRun from './sample.test'

test('Render <Sample />', t => {
	const { store } = TestRun.getVars(),
		testRun = new TestRun(t)

	const component = testRun.renderSample()
	t.ok(component, "<Sample /> component should exist")

	t.end()
})
