import { deleteSignal, fetchSignals, fetchSingalCategories } from '$lib/server/data'
import { fail } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, platform, request }) => {
	return {
		metadata: {
			title: 'Señales'
		},
		signals: await fetchSignals(platform?.env.TELL_API_KEY!),
		signalCategories: await fetchSingalCategories(platform?.env.TELL_API_KEY!)
	}
}

export const actions = {
	delete: async ({ request, params, platform }) => {
		try {
			const formData = await request.formData()
			const id = String(formData.get('id'))
			console.log('delete watermark action, id: ', id)
			await deleteSignal(id, platform?.env.TELL_API_KEY!)
		} catch (error) {
			console.log('ERROR DELETINg SIGNAL', error)
			return fail(500, {
				message: 'Error al eliminar la señal'
			})
		}
	},

	create: async ({ request, params, platform }) => {
		try {
			const formData = await request.formData()
			console.log(formData.get('file'))
		} catch (error) {
			console.log('ERROR DELETINg SIGNAL', error)
			return fail(500, {
				message: 'Error al eliminar la señal'
			})
		}
	}
} satisfies Actions
