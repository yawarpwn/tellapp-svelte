import type Actions from './$types'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, platform, request }) => {
	console.log(request.url)
}

export const actions = {
	default: async ({ request }) => {
		console.log(request.url)
	}
}
