import { fetchAgencies, createAgency, updateAgency, deleteAgency } from '$lib/server/data'
import { trycatch } from '$lib/utils'
import { error, fail } from '@sveltejs/kit'
import type { PageServerLoad, Actions } from './$types'
import { createAgencySchema, updateAgencySchema } from '$lib/schemas'

export const load: PageServerLoad = async ({ params, platform, request }) => {
	return {
		metadata: {
			title: 'Agencias'
		},
		agenciesPromise: fetchAgencies(platform?.env.TELL_API_KEY!)
	}
}

export const actions = {
	create: async ({ cookies, request, platform }) => {
		console.log('create  Agency action --->')
		const formData = await request.formData()
		const entries = Object.fromEntries(formData.entries())
		const result = createAgencySchema.safeParse(entries)

		if (!result.success) {
			return fail(403, { error: result.error.flatten().fieldErrors })
		}

		console.log(result.data, result.error)

		const { data, error } = await trycatch(createAgency(result.data, platform?.env.TELL_API_KEY!))

		if (error) {
			return fail(400, { error: 'Internal Server Error' })
		}

		return {
			success: true,
			message: 'Etiqueta Creado correctamente'
		}
	},

	update: async ({ cookies, request, platform }) => {
		console.log('update Agency action --->')

		const formData = await request.formData()
		const entries = Object.fromEntries(formData.entries())
		const id = String(formData.get('id'))
		const result = updateAgencySchema.safeParse(entries)

		if (!id) {
			return fail(400, { error: 'Id del producto requerido para editar' })
		}

		if (!result.success) {
			return fail(403, { error: result.error.flatten().fieldErrors })
		}

		console.log(result.data)

		const { error } = await trycatch(updateAgency(id, result.data, platform?.env.TELL_API_KEY!))

		if (error) {
			return fail(400, { error: 'Internal Server Error' })
		}

		return {
			success: true,
			message: 'Producto editado correctamente'
		}
	},
	delete: async ({ cookies, request, platform }) => {
		console.log('delete Agency action --->')
		const formData = await request.formData()

		const id = String(formData.get('id'))

		if (!id) {
			return fail(400, { error: 'Id del producto requerido para eliminar' })
		}
		const { data, error } = await trycatch(deleteAgency(id, platform?.env.TELL_API_KEY!))

		if (error) {
			return fail(500, { error: 'Interna server error' })
		}

		return {
			success: true,
			message: 'Producto eliminado correctamente'
		}
	}
} satisfies Actions
