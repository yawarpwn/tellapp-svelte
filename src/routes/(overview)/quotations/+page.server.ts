import { error, redirect, type Action } from '@sveltejs/kit'
import type { Actions } from './$types'
import type { PageServerLoad } from './$types'
import { deleteQuotation, fetchQuotations, searchCustomerByDniOrRuc } from '$lib/server/data'

const ROW_PER_PAGES = 13
export const load: PageServerLoad = async ({ params, platform, request }) => {
	const url = new URL(request.url)
	const query = url.searchParams.get('q') || ''
	const page = url.searchParams.get('page') || '1'

	const data = fetchQuotations(platform?.env?.TELL_API_KEY!, {
		query,
		page,
		limit: ROW_PER_PAGES
	})
	return {
		dataPromise: data,
		metadata: {
			title: 'Cotizaciones'
		}
	}
}

export const actions = {
	destroy: async ({ request, platform }) => {
		const formData = await request.formData()
		const number = Number(formData.get('number'))

		await deleteQuotation(number, platform?.env.TELL_API_KEY!)
		redirect(303, '/quotations')
	},
	search: async ({ request, platform }) => {
		console.log('search')
		const formData = await request.formData()
		const ruc = String(formData.get('ruc'))
		const customer = await searchCustomerByDniOrRuc(ruc, platform?.env.TELL_API_KEY!)
		return {
			customer
		}
	}
} satisfies Actions
