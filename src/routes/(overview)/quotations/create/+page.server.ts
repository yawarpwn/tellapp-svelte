import { fetchCustomers, fetchProductById, fetchProducts } from '$lib/data'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const products = await fetchProducts('kakapichipoto')
	const customers = await fetchCustomers('kakapichipoto')
	return {
		customers,
		products
	}
}

export const actions = {
	create: async ({ cookies, request }) => {
		const formData = await request.formData()
		console.log(formData)
	},
	register: async (event) => {
		// TODO register the user
	}
} satisfies Actions
