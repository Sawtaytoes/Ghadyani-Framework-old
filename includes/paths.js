const root = {
	src: 'src/',
	dest: 'web/',
}

const assets = {
	src: root.src + 'assets/',
	dest: root.dest + 'assets/',
}

const code = {
	src: root.src + 'code/',
	dest: root.dest,
}

const npm = {
	src: 'node_modules/',
}

module.exports = {
	assets,
	code,
	npm,
	root,
}
