const mode = process.argv[2]
const isLocalProductionTesting = !mode

module.exports = {
	isLocalProductionTesting,
	mode,
}
