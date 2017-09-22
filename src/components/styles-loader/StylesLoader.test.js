import React from 'react'
import test from 'tape-catch'
import { shallow } from 'enzyme'

import StylesLoader, { stylesLoader } from './StylesLoader'

test('StylesLoader: Initialize', t => {
	const loader = StylesLoader.create()

	t.deepEqual(
		loader.styleFiles,
		[],
		"Has no styles files"
	)

	t.equal(
		typeof loader.render,
		'function',
		"Has render function"
	)

	t.end()
})

test('StylesLoader: Add Styles', t => {
	const loader = StylesLoader.create()

	loader.add(require('./StylesLoader.styl'))

	t.deepEqual(
		loader.styleFiles,
		[require('./StylesLoader.styl')],
		"Has one styles file"
	)

	loader.add(require('./StylesLoader.styl'))

	t.deepEqual(
		loader.styleFiles,
		[
			require('./StylesLoader.styl'),
			require('./StylesLoader.styl'),
		],
		"Has two styles files"
	)

	t.end()
})

test('StylesLoader: Render', t => {
	const loader = (
		StylesLoader
		.create()
		.add(require('./StylesLoader.styl'))
	)

	const TestComponent = () => <div>Test Component</div>
	const StylesLoaderComponent = loader.render(TestComponent)

	const wrapper = shallow(<StylesLoaderComponent />)

	t.ok(
		wrapper.exists(),
		"StylesLoader component rendered properly"
	)

	t.ok(
		wrapper.contains(<TestComponent />),
		"Wrapped component rendered inside of StylesLoader"
	)

	wrapper.unmount()
	t.end()
})

test('stylesLoader: Load Single Styles File', t => {
	const render = stylesLoader(require('./StylesLoader.styl'))

	t.equal(
		typeof render,
		'function',
		"Has render function"
	)

	t.end()
})

test('stylesLoader: Render', t => {
	const render = stylesLoader(require('./StylesLoader.styl'))

	const TestComponent = () => <div>Test Component</div>
	const StylesLoaderComponent = render(TestComponent)

	const wrapper = shallow(<StylesLoaderComponent />)

	t.ok(
		wrapper.exists(),
		"stylesLoader component rendered properly"
	)

	t.ok(
		wrapper.contains(<TestComponent />),
		"Wrapped component rendered inside of stylesLoader"
	)

	wrapper.unmount()
	t.end()
})
