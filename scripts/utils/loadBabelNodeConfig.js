module.exports = () => (
	require('babel-core/register')({
		presets: [[
			'env',
			{
				targets: {
					node: 'current'
				}
			}
		]]
	})
)
