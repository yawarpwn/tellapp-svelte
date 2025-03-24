import type { Actions, PageServerLoad } from './$types'
import {
	createQuotation,
	fetchCustomers,
	fetchProducts,
	searchCustomerByDniOrRuc
} from '$lib/server/data'
import { fail, redirect } from '@sveltejs/kit'
import { createQuotationSchema } from '$lib/schemas'
import { trycatch } from '$lib/utils'

export const load: PageServerLoad = async ({ cookies, platform }) => {
	const productsPromise = fetchProducts(platform?.env.TELL_API_KEY!)
	const customersPromise = fetchCustomers(platform?.env.TELL_API_KEY!, {
		onlyRegular: true
	})

	return {
		customersPromise,
		productsPromise,
		metadata: {
			title: 'Crear Cotización'
		}
	}
}

export const actions = {
	default: async ({ cookies, request, platform }) => {
		const formData = await request.formData()
		const quotationToInsert = JSON.parse(formData.get('quotation') as string)

		const result = createQuotationSchema.safeParse(quotationToInsert)

		if (!result.success) {
			console.log(result.error.issues)
			return fail(403, { errors: result.error.issues })
		}

		const { data: insertedCustomer, error } = await trycatch(
			createQuotation(quotationToInsert, platform?.env.TELL_API_KEY!)
		)

		if (error) {
			console.log('Api Error: ', error)
			return fail(403, {
				errors: 'Interna server error'
			})
		}
		return redirect(303, `/quotations/${insertedCustomer}`)
	}
} satisfies Actions
