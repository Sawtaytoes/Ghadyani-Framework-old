import React from 'react'

import { getStyles } from '../renderStyles'

const Styles = () => [
	// <link key="google-fonts" rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,400italic,700" />,
	// <link key="font-awesome" rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />,
	<style key="styles" dangerouslySetInnerHTML={{ __html: getStyles() }} />,
]

export default Styles
