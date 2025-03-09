import { createQuotation, deleteQuotation, fetchQuotaitonByNumber, updateCustomer } from '$lib/data'
import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ request, params }) => {
	const quotation = await fetchQuotaitonByNumber(+params.number, 'kakapichipoto')
	return { quotation }
}

export const actions = {
	destroy: async ({ request, platform, url, params }) => {
		await deleteQuotation(+params.number, platform?.env.TELL_API_KEY!)
		redirect(303, '/quotations')
	},
	duplicate: async ({ request, platform, url, params }) => {
		const quotation = await fetchQuotaitonByNumber(+params.number, platform?.env.TELL_API_KEY!)
		const insertedQuotation = await createQuotation(quotation, platform?.env.TELL_API_KEY!)
		redirect(307, `/quotations`)
	},

	'toggle-regular-customer': async ({ request, platform, url, params }) => {
		const formData = await request.formData()
		const id = formData.get('id') as string
		const status = formData.get('status') as string
		//not-favorite == favorite // false
		//favorite   == favorite // true
		updateCustomer(
			id,
			{
				isRegular: status !== 'favorite'
			},
			platform?.env.TELL_API_KEY!
		)
	}
} satisfies Actions
