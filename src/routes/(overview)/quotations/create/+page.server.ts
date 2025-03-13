import type { Actions, PageServerLoad } from './$types'
import { createQuotation, fetchCustomers, fetchProducts, searchCustomerByDniOrRuc } from '$lib/data'
import { redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ cookies, platform }) => {
	const productsPromise = fetchProducts(platform?.env.TELL_API_KEY!)
	const customersPromise = fetchCustomers(platform?.env.TELL_API_KEY!, {
		onlyRegular: true
	})

	return {
		customersPromise,
		productsPromise
	}
}

export const actions = {
	default: async ({ cookies, request, platform }) => {
		const formData = await request.formData()
		const quotation = JSON.parse(formData.get('quotation') as string)
		const insertedCustomer = await createQuotation(quotation, platform?.env.TELL_API_KEY!)
		return redirect(303, `/quotations/${insertedCustomer}`)
	}
} satisfies Actions
