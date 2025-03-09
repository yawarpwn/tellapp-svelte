import type { Actions, PageServerLoad } from './$types'
import {
	fetchCustomers,
	fetchProducts,
	fetchQuotaitonByNumber,
	searchCustomerByDniOrRuc
} from '$lib/data'

export const load: PageServerLoad = async ({ cookies, platform, params }) => {
	const productsPromise = fetchProducts(platform?.env.TELL_API_KEY!)
	const customersPromise = fetchCustomers(platform?.env.TELL_API_KEY!)
	const quotation = await fetchQuotaitonByNumber(+params.number, platform?.env.TELL_API_KEY!)

	return {
		customersPromise,
		productsPromise,
		quotation
	}
}

export const actions = {
	default: async ({ cookies, request, platform }) => {
		const formData = await request.formData()
		const quotation = JSON.parse(formData.get('quotation') as string)
		console.log(quotation)
	}
} satisfies Actions
