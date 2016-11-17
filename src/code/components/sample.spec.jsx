import test from 'tape-catch'
import TestRun from './sample.test'

test('Render <Sample />', t => {
	const testRun = new TestRun(t)
	// const options = TestRun.getVars()

	const component = testRun.renderSample()
	t.ok(component, "<Sample /> component should exist")

	t.end()
})
