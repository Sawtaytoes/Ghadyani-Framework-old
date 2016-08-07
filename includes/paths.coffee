module.exports = do ->
	paths = {}


	##----------------------------------------
	## Root
	##----------------------------------------

	paths.root =
		src: 'src/'
		dest: 'web/'


	##----------------------------------------
	## Assets
	##----------------------------------------

	paths.assets =
		src: paths.root.src + 'assets/'
		dest: paths.root.dest + 'assets/'


	##----------------------------------------
	## Code
	##----------------------------------------

	paths.code =
		src: paths.root.src + 'code/'
		dest: paths.root.dest


	##----------------------------------------
	## Pages
	##----------------------------------------

	paths.pages =
		src: paths.root.dest
		dest: paths.root.dest


	##----------------------------------------
	## NPM
	##----------------------------------------

	paths.npm = src: 'node_modules/'
	paths.npm.slickCarousel = src: paths.npm.src + 'slick-carousel/'


	##----------------------------------------
	##----------------------------------------

	paths
