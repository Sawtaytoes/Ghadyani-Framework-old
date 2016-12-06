/* eslint-disable react/no-danger */

import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

module.exports = () => {
	return '<!DOCTYPE html>' + renderToStaticMarkup(
		<html lang="en">
		<head>
			{/* Document Info */}
			<meta charSet="utf-8" />
			<meta httpEquiv="content-language" content="en-us" />
			<title>Tests</title>

			{/* Site Info */}
			<meta name="description" content="" />

			{/* Favicons */}
			<link rel="icon" href="/favicons/favicon.png" />
			<link rel="shortcut icon" href="/favicons/favicon.ico" />

			{/* Styles */}
			<meta name="viewport" content="width=device-width, initial-scale=1" />
		</head>
		<body>
			{/* HTML */}
			<div id="root" />

			{/* App */}
			<link
				rel="stylesheet"
				href="https://fonts.googleapis.com/css?family=Open+Sans:400,700|Roboto+Mono:400,700"
			/>
			<style dangerouslySetInnerHTML={{__html: `
				h1, h2 {
					font-family: "Open Sans";
				}
				p {
					font-family: "Open Sans";
					font-size: 0.80em;
				}
				pre {
					font-family: "Roboto Mono";
					font-size: 0.75em;
				}
			`}} />
			<script src="/tests.bundle.js"></script>
		</body>
		</html>
	)
}
