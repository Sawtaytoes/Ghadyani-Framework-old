import React from 'react'

import htmlMeta from '../../content/htmlMeta'

const Icons = () => ([
	// Favicons
	<link key="shortcut-icon" rel="shortcut icon" href="/favicons/favicon.ico" />,

	// Windows & IE Icons
	<meta key="application-name" name="application-name" content={htmlMeta.msAppName} />,
	<meta key="msapplication-TileColor" name="msapplication-TileColor" content={htmlMeta.msTileColor} />,
	<meta key="msapplication-TileImage" name="msapplication-TileImage" content="/favicons/microsoft/ms-tile-icon.png" />,
	<meta key="msapplication-tooltip" name="msapplication-tooltip" content={htmlMeta.msTooltip} />,
	<meta key="msapplication-starturl" name="msapplication-starturl" content="?pinned=true" />,
	<meta key="msapplication-task" name="msapplication-task" content="name=Site;action-uri=/;icon-uri=/favicons/favicon.ico" />,

	// iOS Icons
	<link key="apple-touch-icon-1" rel="apple-touch-icon" href="/favicons/apple-touch/apple-touch-icon-precomposed.png" />,
	<link key="apple-touch-icon-2" rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-touch/apple-touch-icon-57x57-precomposed.png" />,
	<link key="apple-touch-icon-3" rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-touch/apple-touch-icon-72x72-precomposed.png" />,
	<link key="apple-touch-icon-4" rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-touch/apple-touch-icon-114x114-precomposed.png" />,
	<link key="apple-touch-icon-5" rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-touch/apple-touch-icon-144x144-precomposed.png" />,
])

export default Icons
