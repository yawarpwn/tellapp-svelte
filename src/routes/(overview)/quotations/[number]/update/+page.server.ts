import type { Actions, PageServerLoad } from './$types'
import {
	fetchCustomers,
	fetchProducts,
	fetchQuotaitonByNumber,
	searchCustomerByDniOrRuc,
	updateQuotation
} from '$lib/data'
import type { QuotationClient } from '$lib/types'
import { redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ cookies, platform, params }) => {
	const productsPromise = fetchProducts(platform?.env.TELL_API_KEY!)
	const customersPromise = fetchCustomers(platform?.env.TELL_API_KEY!, { onlyRegular: true })
	const quotation = await fetchQuotaitonByNumber(+params.number, platform?.env.TELL_API_KEY!)

	return {
		customersPromise,
		productsPromise,
		quotation,
		quotationNumber: params.number
	}
}

export const actions = {
	default: async ({ cookies, request, platform }) => {
		const formData = await request.formData()
		const quotation = JSON.parse(formData.get('quotation') as string) as QuotationClient
		const { number: quotationNumber } = await updateQuotation(
			quotation,
			platform?.env.TELL_API_KEY!
		)
		return redirect(303, `/quotations/${quotationNumber}`)
	}
} satisfies Actions
