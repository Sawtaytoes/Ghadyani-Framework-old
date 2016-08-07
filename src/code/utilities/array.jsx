// Takes a range or a max value
// Creates an array of integers in that range
export function createArrayFromRange (low, high, interval = 1) {
	!high && (high = low - 1) && (low = 0)

	let array = []

	for(let i = low; i <= high; i+=interval) {
		array.push(i)
	}

	return array
}
