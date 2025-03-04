import type { Actions, PageServerLoad } from './$types'
import {
	fetchCustomers,
	fetchLabels,
	fetchProductById,
	fetchProducts,
	searchCustomerByDniOrRuc
} from '$lib/data'

export const load: PageServerLoad = async ({ cookies }) => {
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
		const quotation = JSON.parse(formData.get('quotation') as string)
	},
	search: async ({ request, platform }) => {
		const formData = await request.formData()
		const ruc = String(formData.get('ruc'))
		const customer = await searchCustomerByDniOrRuc(ruc, platform?.env.TELL_API_KEY)
		return {
			customer
		}
	}
} satisfies Actions
