import React from 'react'

import { getStyles } from '../renderStyles'

const Styles = () => [
	<style key="styles" dangerouslySetInnerHTML={{ __html: getStyles() }} />,
]

export default Styles
