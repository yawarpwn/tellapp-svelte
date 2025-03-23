import { createProduct, fetchProducts, deleteProduct } from '$lib/data'
import { trycatch } from '$lib/utils'
import { error, fail } from '@sveltejs/kit'
import type { PageServerLoad, Actions } from './$types'
import { createProductSchema } from '$lib/schemas'

export const load: PageServerLoad = async ({ params, platform, request }) => {
	const { data, error } = await trycatch(fetchProducts(platform?.env.TELL_API_KEY!))

	if (error || !data) {
		return fail(400, { error: 'Interna server error' })
	}

	return {
		metadata: {
			title: 'Productos'
		},
		products: data
	}
}

export const actions = {
	create: async ({ cookies, request, platform }) => {
		console.log('action')
		const formData = await request.formData()

		const entries = Object.fromEntries(formData.entries())

		const result = createProductSchema.safeParse(entries)

		if (!result.success) {
			return fail(403, { errors: result.error.flatten().fieldErrors })
		}

		const { data, error } = await trycatch(
			createProduct({ ...result.data, categoryId: 3 }, platform?.env.TELL_API_KEY!)
		)

		if (error) {
			fail(400, { errors: 'Interna server error' })
		}

		return {
			success: true,
			message: 'Product created successfully'
		}

		// console.log(formData)
	},

	delete: async ({ cookies, request, platform }) => {
		const formData = await request.formData()

		const { data, error } = await trycatch(
			deleteProduct(String(formData.get('id')), platform?.env.TELL_API_KEY!)
		)

		if (error) {
			fail(500, { errors: 'Interna server error' })
		}

		return {
			success: true,
			message: 'Product deleted successfully'
		}

		// console.log(formData)
	}
} satisfies Actions
