import type Actions from './$types'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, platform, request }) => {
	const url = new URL(request.url)
	return {
		q: url.searchParams.get('q')
	}
}

export const actions = {
	default: async ({ request }) => {
		console.log(request.url)
	}
}
