import type { Actions, PageServerLoad } from './$types'
import {
	fetchCustomers,
	fetchProductById,
	fetchProducts,
	searchCustomerByDniOrRuc
} from '$lib/data'

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

		const customer = await searchCustomerByDniOrRuc(ruc, platform?.env.TELL_API_KEY)
		return customer
		// TODO register the user
	}
} satisfies Actions
