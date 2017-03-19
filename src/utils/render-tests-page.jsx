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
			<script src="/manifest.bundle.js"></script>
			<script src="/tests.bundle.js"></script>

			<link
				rel="stylesheet"
				href="https://fonts.googleapis.com/css?family=Open+Sans:400,700|Roboto+Mono:400,700"
			/>

			<style dangerouslySetInnerHTML={{__html: `
				*, *::before, *::after {
					box-sizing: border-box;
				}

				body {
					margin: 0;
				}

				div {
					font-family: "Open Sans";
				}

				h1 {
					font-family: "Open Sans";
					margin: 0 0.2em;
				}

				h2 {
					font-family: "Open Sans";
					margin: 0 0.3em;
				}

				h3 {
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
		</body>
		</html>
	)
}
