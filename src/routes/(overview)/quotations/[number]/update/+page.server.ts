import type { Actions, PageServerLoad } from './$types'
import { fetchCustomers, fetchProducts, fetchQuotaitonByNumber, updateQuotation } from '$lib/data'
import { fail, redirect } from '@sveltejs/kit'
import { updateQuotationSchema } from '$lib/schemas'

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
		const result = updateQuotationSchema.safeParse(quotationToUpdate)
		if (!result.success) {
			console.log('error', result.error.flatten().formErrors)
			fail(403, { errors: result.error.flatten().formErrors })
		}
		const quotationId = formData.get('id') as string
		console.log('success', result.data)
		const { number: quotationNumber } = await updateQuotation(
			result.data,
			quotationId,
			platform?.env.TELL_API_KEY!
		)
		return redirect(303, `/quotations/${quotationNumber}`)
	}
} satisfies Actions
