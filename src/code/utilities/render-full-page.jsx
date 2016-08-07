import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

// Utilities
import {
	htmlMeta,
	dnsPrefetches,
	thirdPartyAssets
} from './render-full-page-extras'
import { renderStyles } from './styles-helper'

const cacheAge = 604800, // 1wk -> 60s x 60m x 24h x 7d
	prod = process.env.NODE_ENV === 'production'

module.exports = function renderFullPage(renderedContent = undefined, state = {}) {
	return '<!DOCTYPE html>' + renderToStaticMarkup(
		<html lang="en">
		<head>
			{/* Document Info */}
			<meta charSet="utf-8" />
			<meta httpEquiv="content-language" content="en-us" />
			<title>{`${state.locationChange && state.locationChange.title}${htmlMeta.titlePostfix}`}</title>

			{/* Site Info */}
			<meta name="author" content={htmlMeta.author} />
			<meta name="copyright" content={htmlMeta.copyright} />
			<meta name="description" content={state.locationChange && state.locationChange.description} />
			<meta name="keywords" content={htmlMeta.keywords} />

			{/* Cache */}
			{prod && <meta httpEquiv="cache-control" content={`max-age=${cacheAge}`} />}
			{prod && <meta httpEquiv="expires" content={new Date(Date.now() + (cacheAge * 1000))} />}

			{/* Favicons */}
			<link rel="icon" href="/favicons/favicon.png" />
			<link rel="shortcut icon" href="/favicons/favicon.ico" />

			{/* Windows & IE Icons */}
			<meta name="application-name" content={htmlMeta.msAppName} />
			<meta name="msapplication-TileColor" content={htmlMeta.msTileColor} />
			<meta name="msapplication-TileImage" content="/favicons/microsoft/ms-tile-icon.png" />
			<meta name="msapplication-tooltip" content={htmlMeta.msTooltip} />
			<meta name="msapplication-starturl" content="?pinned=true" />
			<meta name="msapplication-task" content="name=Site;action-uri=/;icon-uri=/favicons/favicon.ico" />

			{/* iOS Icons */}
			<link rel="apple-touch-icon" href="/favicons/apple-touch/apple-touch-icon-precomposed.png" />
			<link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-touch/apple-touch-icon-57x57-precomposed.png" />
			<link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-touch/apple-touch-icon-72x72-precomposed.png" />
			<link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-touch/apple-touch-icon-114x114-precomposed.png" />
			<link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-touch/apple-touch-icon-144x144-precomposed.png" />

			{/* DNS Prefetching */}
			<meta httpEquiv="x-dns-prefetch-control" content="on" />
			{dnsPrefetches}

			{/* Styles */}
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<style dangerouslySetInnerHTML={{__html: renderStyles()}} />
		</head>
		<body>
			{/* HTML */}
			<div id="root" dangerouslySetInnerHTML={{__html: renderedContent}}></div>

			{/* 3rd Party Styles */}
			{thirdPartyAssets}

			{/* App */}
			<script dangerouslySetInnerHTML={{__html: 'window.__INITIAL_STATE__ =' + JSON.stringify(state)}} />
			<script src="/bundle.js"></script>
		</body>
		</html>
	)
}
