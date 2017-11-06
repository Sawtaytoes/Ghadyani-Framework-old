/* eslint-disable react/no-danger */

import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import DocumentInfo from './site/DocumentInfo'
import Icons from './site/Icons'
import DnsPrefetches from './site/DnsPrefetches'
import MetaInfo from './site/MetaInfo'
import ThirdPartyAssets from './site/ThirdPartyAssets'
import Styles from './site/Styles'

const isProd = process.env.NODE_ENV === 'production'

module.exports = (renderedContent = undefined, state) => (
	'<!DOCTYPE html>' + renderToStaticMarkup(
		<html lang="en">
		<head>
			<DocumentInfo />
			<MetaInfo
				pageDescription={state.pageMeta.description}
				titlePrefix={state.pageMeta.name}
			/>
			<Icons />
			<DnsPrefetches />
			<Styles />
		</head>
		<body>
			<div id="react-root" dangerouslySetInnerHTML={{ __html: renderedContent }} />

			{/* Server-side load app state */}
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
