import {
	deleteSignal,
	fetchSignals,
	fetchSingalCategories,
	createSignal,
	updateSignal
} from '$lib/server/data'
import { fail } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { trycatch } from '$lib/utils'

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
		const formData = await request.formData()
		const id = String(formData.get('id'))
		console.log('delete signal with id: ', id)
		const { error, data } = await trycatch(deleteSignal(id, platform?.env.TELL_API_KEY!))

		if (error) {
			return fail(500, {
				message: 'Error al eliminar la señal'
			})
		}

		return {
			success: true,
			message: 'Señal eliminada correctamente'
		}
	},

	create: async ({ request, platform }) => {
		const formData = await request.formData()
		const { error, data } = await trycatch(createSignal(formData, platform?.env.TELL_API_KEY!))

		if (error) {
			return fail(500, {
				message: 'Error al eliminar la señal'
			})
		}

		return {
			success: true,
			message: 'Señal creada correctamente'
		}
	},

	update: async ({ request, platform }) => {
		const formData = await request.formData()
		const id = String(formData.get('id'))
		const { error, data } = await trycatch(updateSignal(formData, platform?.env.TELL_API_KEY!, id))

		if (error) {
			return fail(500, {
				message: 'Error al eliminar la señal'
			})
		}

		return {
			success: true,
			message: 'Señal creada correctamente'
		}
	}
} satisfies Actions
