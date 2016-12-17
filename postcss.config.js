module.exports = { plugins: [
	require('autoprefixer')({ browsers: [
		'last 4 versions',
		'> 5%',
		'ie 11',
		'not ie <= 10',
	] })
]}
