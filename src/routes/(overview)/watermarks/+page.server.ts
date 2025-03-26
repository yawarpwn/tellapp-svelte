import { fetchWatermarks } from '$lib/server/data'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, platform, request }) => {
	return {
		metadata: {
			title: 'Marca de Agua'
		},
		watermarksPromise: fetchWatermarks(platform?.env.TELL_API_KEY!)
	}
}
