import { error, redirect, type Action } from '@sveltejs/kit'
import type { Actions } from './$types'
import type { PageServerLoad } from './$types'
import { deleteQuotation, fetchQuotations } from '$lib/data'

export const load: PageServerLoad = async ({ params, platform, request }) => {
	const url = new URL(request.url)
	const query = url.searchParams.get('q') || ''
	const quotations = fetchQuotations(platform?.env?.TELL_API_KEY!, {
		query
	})
	try {
		return {
			quotations,
			meta: {
				title: 'Quotations'
			}
		}
	} catch (err) {
		error(404, 'Not found')
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
	}
} satisfies Actions
