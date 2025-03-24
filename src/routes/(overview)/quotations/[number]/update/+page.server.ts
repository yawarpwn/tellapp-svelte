import type { Actions, PageServerLoad } from './$types'
import {
	fetchCustomers,
	fetchProducts,
	fetchQuotaitonByNumber,
	updateQuotation
} from '$lib/server/data'
import { fail, redirect } from '@sveltejs/kit'
import { updateQuotationSchema } from '$lib/schemas'
import { trycatch } from '$lib/utils'

export const load: PageServerLoad = async ({ cookies, platform, params }) => {
	const productsPromise = fetchProducts(platform?.env.TELL_API_KEY!)
	const customersPromise = fetchCustomers(platform?.env.TELL_API_KEY!, { onlyRegular: true })
	const quotationPromise = fetchQuotaitonByNumber(+params.number, platform?.env.TELL_API_KEY!)

	return {
		customersPromise,
		productsPromise,
		quotationPromise,
		quotationNumber: params.number,
		metadata: {
			title: 'Actualiza Cotización'
		}
	}
}

export const actions = {
	default: async ({ cookies, request, platform }) => {
		const formData = await request.formData()
		const quotationToUpdate = JSON.parse(formData.get('quotation') as string)
		console.log(quotationToUpdate)
		const result = updateQuotationSchema.safeParse(quotationToUpdate)
		console.log(result.data)
		if (!result.success) {
			console.log('error', result.error.issues)
			return fail(403, { error: result.error.issues })
		}
		const quotationId = formData.get('id') as string

		const { data, error } = await trycatch(
			updateQuotation(result.data, quotationId, platform?.env.TELL_API_KEY!)
		)

		if (error) {
			return fail(403, { error: error.message })
		}

		return redirect(303, `/quotations/${data.number}`)
	}
} satisfies Actions
