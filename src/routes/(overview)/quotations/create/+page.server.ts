import {
	fetchCustomers,
	fetchProductById,
	fetchProducts,
	searchCustomerByDniOrRuc
} from '$lib/data'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const products = fetchProducts('kakapichipoto')
	const customers = fetchCustomers('kakapichipoto')
	return {
		customers,
		products
	}
}

export const actions = {
	create: async ({ cookies, request, platform }) => {
		const formData = await request.formData()
		console.log(formData)
	},
	search: async ({ request, platform }) => {
		const formData = await request.formData()
		const ruc = formData.get('ruc') as string

		if (ruc.length !== 11) {
			return {
				success: false,
				message: 'El RUC debe tener 11 dígitos'
			}
		}

		await searchCustomerByDniOrRuc(ruc, platform?.env.TELL_API_KEY!)
		console.log(ruc)
		// TODO register the user
	}
} satisfies Actions
