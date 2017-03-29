import React from 'react'
import { connect } from 'react-redux'

import { toggleValue } from 'ducks/re-render'
import ReRenderChild from 'components/re-render/re-render-child'
import ReRenderSibling from 'components/re-render/re-render-sibling'

const childContainerStyles = {
	padding: '5px',
	background: 'lightgrey',
}

const ReRenderParent = ({ toggleValue, value }) => {
	const toggleValueRef = toggleValue
	const callToggleValue = () => toggleValue()
	const returnToggleValue = () => toggleValue
	return (
		<div>
			<button onClick={toggleValue}>Parent Button</button>

			<div>Button Value: {value.toString()}</div>

			<div style={childContainerStyles}>
				<h3>No Props</h3>
				<ReRenderChild />

				<h3>ToggleValue</h3>
				<ReRenderChild onClick={toggleValue} />

				<h3>ToggleValue Reference</h3>
				<ReRenderChild onClick={toggleValueRef} />

				<h3>Return Called ToggleValue</h3>
				<ReRenderChild onClick={callToggleValue} />

				<h3>Called Function Returning ToggleValue</h3>
				<ReRenderChild onClick={returnToggleValue()} />

				<h3>Bind Function</h3>
				<ReRenderChild onClick={toggleValue.bind(null)} />

				<h3>Inline Function</h3>
				<ReRenderChild onClick={() => toggleValue()} />

				<h3>Sibling</h3>
				<ReRenderSibling />
			</div>

			<p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>
		</div>
	)
}

const mapStateToProps = ({ reRender: { value } }) => ({ value })

const mapDispatchToProps = dispatch => ({
	toggleValue: () => dispatch(toggleValue()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ReRenderParent)
