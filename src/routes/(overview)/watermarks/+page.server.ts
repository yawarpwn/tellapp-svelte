import { deleteWatermark, fetchWatermarks } from '$lib/server/data'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, platform, request }) => {
	return {
		metadata: {
			title: 'Marca de Agua'
		},
		watermarksPromise: fetchWatermarks(platform?.env.TELL_API_KEY!)
	}
}

export const actions = {
	delete: async ({ request, params, platform }) => {
		const formData = await request.formData()
		const ids = String(formData.get('ids')).split(',')
		for (const id of ids) {
			await deleteWatermark(id, platform?.env.TELL_API_KEY!)
		}
		console.log(ids)
	}
} satisfies Actions
