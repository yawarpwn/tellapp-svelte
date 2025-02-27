import { fetchQuotaitonByNumber } from '$lib/data'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ request, params }) => {
	const quotation = await fetchQuotaitonByNumber(+params.number, 'kakapichipoto')
	return { quotation }
}
