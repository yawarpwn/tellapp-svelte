import { error } from '@sveltejs/kit'
// import type { PageLoad } from './$types';
import type { PageServerLoad } from './$types'
import { fetchQuotations } from '$lib/data'

export const load: PageServerLoad = async ({ params, platform }) => {
	const quotations = fetchQuotations(platform?.env?.TELL_API_KEY!)
	try {
		return {
			quotations
		}
	} catch (err) {
		error(404, 'Not found')
	}
}
