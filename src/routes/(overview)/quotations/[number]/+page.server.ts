import {
	createQuotation,
	deleteQuotation,
	fetchQuotaitonByNumber,
	updateCustomer
} from '$lib/server/data'
import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ request, params, platform }) => {
	const quotationPromise = fetchQuotaitonByNumber(+params.number, platform?.env.TELL_API_KEY!)
	return {
		// quotationPromise,
		quotation: await quotationPromise,
		quotationNumber: params.number,
		metadata: {
			title: `Cotización #${params.number}`
		}
	}
}

export const actions = {
	destroy: async ({ request, platform, url, params }) => {
		await deleteQuotation(+params.number, platform?.env.TELL_API_KEY!)
		redirect(303, '/quotations')
	},
	duplicate: async ({ request, platform, url, params }) => {
		const quotation = await fetchQuotaitonByNumber(+params.number, platform?.env.TELL_API_KEY!)
		const mappedQuotation = {
			...quotation,
			items: quotation.items.map((item) => ({
				...item,
				price: Number(item.price),
				cost: item.cost ? Number(item.cost) : undefined,
				qty: Number(item.qty)
			}))
		}
		const insertedQuotation = await createQuotation(mappedQuotation, platform?.env.TELL_API_KEY!)
		redirect(307, `/quotations/${insertedQuotation}`)
	},

	'toggle-regular-customer': async ({ request, platform, url, params }) => {
		const formData = await request.formData()
		const id = formData.get('id') as string
		const status = formData.get('status') as string
		//not-favorite == favorite // false
		//favorite   == favorite // true
		console.log('toggle-regular-customer', {
			id,
			status,
			isRegular: status !== 'favorite'
		})
		await updateCustomer(
			id,
			{
				isRegular: status !== 'favorite'
			},
			platform?.env.TELL_API_KEY!
		)

		return {
			success: true
		}
	}
} satisfies Actions
