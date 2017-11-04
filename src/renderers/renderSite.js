/* eslint-disable react/no-danger */

import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import { getStyles } from './renderStyles'

import
	htmlMeta,
	{
		DnsPrefetches,
		ThirdPartyAssets,
	}
from '../content/htmlMeta'

const cacheAge = 604800 // 1wk -> 60s x 60m x 24h x 7d
const isProd = process.env.NODE_ENV === 'production'

module.exports = (renderedContent = undefined, state) => (
	'<!DOCTYPE html>' + renderToStaticMarkup(
		<html lang="en">
		<head>
			{/* Document Info */}
			<meta charSet="utf-8" />
			<meta httpEquiv="content-language" content="en-us" />
			<title>{`${state.pageMeta.name}${htmlMeta.titlePostfix}`}</title>

			{/* Site Info */}
			<meta name="author" content={htmlMeta.author} />
			<meta name="copyright" content={htmlMeta.copyright} />
			<meta name="description" content={state.pageMeta.description} />
			<meta name="keywords" content={htmlMeta.keywords} />

			{/* Cache */}
			<meta httpEquiv="cache-control" content={`max-age=${cacheAge}`} />

			{/* Favicons */}
			{/*<link rel="icon" href="/favicons/favicon.png" />*/}
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
			<DnsPrefetches />

			{/* Styles */}
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<style dangerouslySetInnerHTML={{ __html: getStyles() }} />
		</head>
		<body>
			{/* HTML */}
			<div id="root" dangerouslySetInnerHTML={{ __html: renderedContent }} />

			{/* App */}
			<script
				dangerouslySetInnerHTML={{
					__html: `window.__INITIAL_STATE__ = ${JSON.stringify(state)}`
				}}
			/>

			<script src="/manifest.bundle.js" />
			{isProd && <script src="/vendor.bundle.js" />}
			<script src="/main.bundle.js" />

			{/* 3rd Party Styles */}
			<ThirdPartyAssets />
		</body>
		</html>
	)
)
