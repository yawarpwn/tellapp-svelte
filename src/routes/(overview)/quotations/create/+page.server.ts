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
		const quotation = JSON.parse(formData.get('quotation') as string)
		console.log(quotation)
	}
} satisfies Actions
