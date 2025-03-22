export async function load() {
	const products = new Promise((resolve, reject) => {
		const random = Math.random()
		setTimeout(() => {
			if (random > 0.5) {
				reject('Error')
			}
			resolve('Fullfiel')
		}, 1500)
	})

	return {
		products
	}
}
