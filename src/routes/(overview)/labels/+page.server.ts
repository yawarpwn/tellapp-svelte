import { fetchLabels, fetchAgencies, createLabel, updateLabel, deleteLabel } from '$lib/server/data'
import { trycatch } from '$lib/utils'
import { error, fail } from '@sveltejs/kit'
import type { PageServerLoad, Actions } from './$types'
import { createLabelSchema, updateLabelSchema } from '$lib/schemas'

export const load: PageServerLoad = async ({ params, platform, request }) => {
	const [labels, agencies] = await Promise.all([
		fetchLabels(platform?.env.TELL_API_KEY!),
		fetchAgencies(platform?.env.TELL_API_KEY!)
	])
	return {
		metadata: {
			title: 'Etiquetas'
		},
		labels,
		agencies
	}
}

export const actions = {
	create: async ({ cookies, request, platform }) => {
		console.log('create  product action --->')
		const formData = await request.formData()
		const entries = Object.fromEntries(formData.entries())
		const result = createLabelSchema.safeParse(entries)

		if (!result.success) {
			return fail(403, { error: result.error.flatten().fieldErrors })
		}

		console.log(result.data, result.error)

		const { data, error } = await trycatch(createLabel(result.data, platform?.env.TELL_API_KEY!))

		if (error) {
			return fail(400, { error: 'Internal Server Error' })
		}

		return {
			success: true,
			message: 'Etiqueta Creado correctamente'
		}
	},

	update: async ({ cookies, request, platform }) => {
		console.log('update product action --->')

		const formData = await request.formData()
		const entries = Object.fromEntries(formData.entries())
		const id = String(formData.get('id'))
		const result = updateLabelSchema.safeParse(entries)

		if (!id) {
			return fail(400, { error: 'Id del producto requerido para editar' })
		}

		if (!result.success) {
			return fail(403, { error: result.error.flatten().fieldErrors })
		}

		console.log(result.data)

		const { error } = await trycatch(updateLabel(id, result.data, platform?.env.TELL_API_KEY!))

		if (error) {
			return fail(400, { error: 'Internal Server Error' })
		}

		return {
			success: true,
			message: 'Producto editado correctamente'
		}
	},
	delete: async ({ cookies, request, platform }) => {
		console.log('delete product action --->')
		const formData = await request.formData()

		const id = String(formData.get('id'))

		if (!id) {
			return fail(400, { error: 'Id del producto requerido para eliminar' })
		}
		const { data, error } = await trycatch(deleteLabel(id, platform?.env.TELL_API_KEY!))

		if (error) {
			return fail(500, { error: 'Interna server error' })
		}

		return {
			success: true,
			message: 'Producto eliminado correctamente'
		}

		// console.log(formData)
	}
} satisfies Actions
