// NOTE: Enzyme wrappers have to be unmounted at the end of every test or DOM styles will persist

import React from 'react'
import test from 'tape-catch'
import { shallow } from 'enzyme'

import 'utils/polyfills'

import renderStyles, {
	getStyles,
	setStyles,
} from './renderStyles'

const getStylesFromDOM = () => (
	// Correct Method
	// document.querySelectorAll('style[id*="renderStyles"]')

	// Hack for PhantomJS
	Array.from(
		document.querySelectorAll('style')
	)
	.map(style => style.innerHTML)
	.filter(styles => styles.includes('.render-styles'))
)

test('renderStyles: Initialize', t => {
	const TestComponent = () => <div>Test Component</div>

	const Styles = renderStyles()(TestComponent)

	const wrapper = shallow(<Styles />)

	t.ok(
		wrapper.exists(),
		"Styles component rendered properly"
	)

	t.equal(
		wrapper.instance().styleRemovers.length,
		0,
		"Starts with no styles"
	)

	wrapper.unmount()
	t.end()
})

test('renderStyles: Render', t => {
	const TestComponent = () => <div>Test Component</div>

	const Styles = (
		renderStyles([
			require('./renderStyles.styl'),
			require('./renderStyles.styl'),
		])(
			TestComponent
		)
	)

	const wrapper = shallow(<Styles />)

	t.ok(
		wrapper.exists(),
		"Styles component rendered properly"
	)

	t.ok(
		wrapper.contains(<TestComponent />),
		"Wrapped component rendered inside of Styles"
	)

	t.equal(
		wrapper.instance().styleRemovers.length,
		2,
		"Loaded styles"
	)

	wrapper.unmount()
	t.end()
})

test('renderStyles: <style /> tag in <head />', t => {
	const TestComponent = () => <div>Test Component</div>

	const Styles = (
		renderStyles([
			require('./renderStyles.styl'),
			require('./renderStyles.styl'),
		])(
			TestComponent
		)
	)

	const wrapper = shallow(<Styles />)

	const styles = getStylesFromDOM()

	t.ok(
		styles.length,
		"Styles rendered to the DOM"
	)

	t.equal(
		styles.length,
		1,
		"No duplicate styles in the DOM"
	)

	wrapper.unmount()

	// Styles don't immediately umount
	new Promise(setTimeout)
	.then(() => {
		const styles = getStylesFromDOM()

		t.equal(
			styles.length,
			0,
			"Styles removed from the DOM"
		)
	})
	.then(t.end)
})

test('renderStyles: Render Multiple Styles-Wrapped Components', t => {
	const TestComponent = () => <div>Test Component</div>

	const Styles = (
		renderStyles([
			require('./renderStyles.styl'),
			require('./renderStyles.styl'),
		])(
			TestComponent
		)
	)

	const wrapper1 = shallow(<Styles />)
	const wrapper2 = shallow(<Styles />)

	const styles = getStylesFromDOM()

	t.ok(
		styles.length,
		"Styles rendered to the DOM"
	)

	t.equal(
		styles.length,
		1,
		"No duplicate styles in the DOM"
	)

	wrapper1.unmount()

	// Styles don't immediately umount
	new Promise(setTimeout)
	.then(() => {
		const styles = getStylesFromDOM()

		t.equal(
			styles.length,
			1,
			"Styles still in the DOM"
		)
	})
	.then(() => wrapper2.unmount())
	.then(new Promise(setTimeout))
	.then(() => {
		const styles = getStylesFromDOM()

		t.equal(
			styles.length,
			1,
			"Styles removed from the DOM"
		)
	})
	.then(t.end)
})

test('renderStyles: Server-Side Rendering', t => {
	setStyles(require('./renderStyles.styl')._getCss())
	setStyles(require('./renderStyles.styl')._getCss())

	const styles = getStyles()

	t.ok(
		styles,
		"Styles exist"
	)

	t.ok(
		styles.includes('.render-styles'),
		"Styles rendered to the <style> tag"
	)

	t.equal(
		styles.match(/\.render-styles/g).length,
		1,
		"No duplicate styles in <style> tag"
	)

	t.end()
})
