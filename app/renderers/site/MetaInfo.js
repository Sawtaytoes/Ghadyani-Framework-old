import React from 'react'

import htmlMeta from '../../content/htmlMeta'

const cacheAge = 604800 // 1wk -> 60s x 60m x 24h x 7d

const MetaInfo = ({ pageDescription, titlePrefix }) => ([
	<title key="title">{`${titlePrefix}${htmlMeta.titlePostfix}`}</title>,

	<meta key="author" name="author" content={htmlMeta.author} />,
	<meta key="copyright" name="copyright" content={htmlMeta.copyright} />,
	<meta key="description" name="description" content={pageDescription} />,
	<meta key="keywords" name="keywords" content={htmlMeta.keywords} />,
	<meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" />,

	<meta httpEquiv="cache-control" content={`max-age=${cacheAge}`} />,
])

export default MetaInfo
